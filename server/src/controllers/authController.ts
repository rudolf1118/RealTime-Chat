import User from "../models/userModel";
import { Auth_Controller } from "../types/Controllers";
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';

class AuthController implements Auth_Controller {
    async register(req: any, res: any, next: any): Promise<any> {
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
    async login(req: any, res: any): Promise<any> {
        const { email, password } = req.body;

    }

    async logout(req: any, res: any): Promise<any> {
        res.clearCookie("token").send("Logged out");
    }
}

export default new AuthController();