import User from "../models/userModel";
import { Auth_Controller } from "../types/Controllers";
import { ModuleRes } from "../types/UtilTypes";
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';
import config from "../auth/tokenGeneration/config";
import tokenGenerator from "../auth/tokenGeneration/generator";
import jwt from "jsonwebtoken";

class AuthController implements Auth_Controller {
    async register(req: any, res: any, next: any): Promise<ModuleRes> {
        try {
            const { username, email, password } = req.body;
            console.log(req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });
            await user.save();
            console.log("user saved", user);
            res.status(201).json({ status: "success", message: "Registration successful" });
        } catch (error) {
            next();
            console.log("error in auth controller", error);
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
            console.log(user);
            const token = tokenGenerator(user._id.toString(), user.role);
            console.log(token);
            return res.status(200).json({ status: "success", message: "Login successful.", token, user_id: user._id });
        } catch (error) {
            next(error);
            console.log("error in auth controller", error);
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
            return res.status(404).json({ status: "error", message: "User not found." });
        }
        res.status(200).json({ code: 200, status: "success", message: "Token is valid." });
    }
}

export default new AuthController();