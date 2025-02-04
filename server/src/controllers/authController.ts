import User from "../models/userModel";
import { Auth_Controller } from "../types/Controllers";
import { ModuleRes } from "../types/UtilTypes";
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';
import config from "../auth/tokenGeneration/config";
import tokenGenerator from "../auth/tokenGeneration/generator";
import jwt from "jsonwebtoken";
import { removePasswordFromUser } from "../utils/helperFunctions";
import { logger } from "../utils/logger";
import { checkDuplicate } from "../utils/db_utils";
import { redisClient } from "../server";

class AuthController implements Auth_Controller {
    async register(req: any, res: any, next: any): Promise<ModuleRes> {
        try {
            const { username, email, password } = req.body;
            const check = await checkDuplicate(email, username);
            if (check) {
                logger.log("Exist Error: ", check);
                return res.status(400).json({ status: "error", message: check });
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });
            await user.save();
            logger.log("user saved", user);
            res.status(201).json({ status: "success", message: "Registration successful" });
        } catch (error) {
            next();
            logger.log("error in auth controller", error);
            res.status(500).json({ status: "error", message: error.message });  
        }
    }
    async login(req: any, res: any, next: any): Promise<ModuleRes> {
        try {
            const { creds, password } = req.body;
            const user:any = await User.findOne({ $or: [{ email: creds }, { username: creds }] });
            logger.log("user", user);
            if (!user) {
                return res.status(401).json({ status: "error", message: "Username or email is incorrect." });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ status: "error", message: "Invalid password." });
            }
            const token = tokenGenerator(user._id.toString(), user.role);
            return res.status(200).json({ status: "success", message: "Login successful.", token, user_id: user._id });
        } catch (error) {
            next(error);
            logger.log("error in auth controller", error);
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    async tokenChecker(req: any, res: any, next: any): Promise<ModuleRes> {
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.secret as any);
        const user_id = (decoded as any).id;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors });
        }
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(204).json({ status: "error", message: "Invalid token." });
        }
        res.status(200).json({ code: 200, status: "success", message: "Token is valid." });
    }
    async getUserIdFromToken(req: any): Promise<string> {
        const { authorization } = req?.isSocket ? req.userInfo : req.headers;
        const token = authorization.split(" ")[1] || authorization;
        const decoded = jwt.verify(token, config.secret as any);
        const user_id = (decoded as any).id;
        if (!user_id) {
            throw new Error("User id not found!");
        }
        return user_id;
    }
    async getUser(req: any, res: any, next: any): Promise<any> {
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.secret as any);
        const user_id = (decoded as any).id;
        if (!user_id) {
            res.status(404).json({ status: "error", message: "User id not found!" });
        }
        const user = await User.findById(user_id);
        res.status(200).json({ status: "success", message: "User fetched successfully", user: removePasswordFromUser(user) });
    }
    async getUserStatus(req: any, res: any, next: any): Promise<any> {
        try {
            const { authorization } = req.headers;
            const token = authorization.split(" ")[1];
            const decoded = jwt.verify(token, config.secret as any);
            const user_id = (decoded as any).id;
            const userRedisData = await redisClient.get(`${user_id}`);
            const userData = JSON.parse(userRedisData as any);
            if (userRedisData && userData.status === "online") {
                return res.status(200).json({...userData });
            }
            res.status(200).json({ status: "offline",message: "User is currently offline", user_id });
        } catch (error) {
            logger.error("Error in getUserStatus:", error);
            res.status(400).json({ status: "error", message: error.message });
        }
    }
}

export default new AuthController();