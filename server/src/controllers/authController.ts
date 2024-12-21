import User from "../models/userModel";
import { Auth_Controller } from "../types/Controllers";
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';
import config from "../auth/tokenGeneration/config";
import tokenGenerator from "../auth/tokenGeneration/generator";

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
    async login(req: any, res: any, next: any): Promise<any> {
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
            res.status(200).json({ status: "success", message: "Login successful.", token, user_id: user._id });
        } catch (error) {
            next(error);
            console.log("error in auth controller", error);
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    async logout(req: any, res: any): Promise<any> {
        const handleLogout = () => {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        handleLogout();
    }
}

export default new AuthController();