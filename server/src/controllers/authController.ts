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

class AuthController implements Auth_Controller {
    async register(req: any, res: any, next: any): Promise<ModuleRes> {
        try {
            const { username, email, password } = req.body;
            const check = await User.findOne({ $or: [{ email }, { username }] });
            if (check) {
                logger.log("Email or username already exists", `User Name: ${username} Email: ${email}`);
                return res.status(400).json({ status: "error", message: "Email or username already exists" });
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
            const { email, password } = req.body;
            const user:any = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ status: "error", message: "User not found." });
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
}

export default new AuthController();