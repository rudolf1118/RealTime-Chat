import User from "../models/userModel";
import { Friend_Controller } from "../types/Controllers";
import { validationResult } from 'express-validator';

class FriendController implements Friend_Controller {
    async addFriend(req: any, res: any, next: any): Promise<any> {
        try {
            const { userId, friendId } = req.body;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ status: "error", message: "User not found." });
            }
            const friend = await User.findById(friendId);
            if (!friend) {
                return res.status(404).json({ status: "error", message: "Friend not found." });
            }
            if (user.friends.includes(friendId)) {
                return res.status(400).json({ status: "error", message: "Friend already added." });
            }
            user.friends.push(friendId);
            await user.save();
            res.status(200).json({ status: "success", message: "Friend added successfully" });
        } catch (error) {
            next();
            console.log("error in auth controller", error);
            res.status(500).json({ status: "error", message: error.message });  
        }
    }
    async getFriendById(req: any, res: any, next: any): Promise<any> {
        try {
            const { userId } = req.body;
            const user = await User.findById("676037263f80f58b95bfd35e");
            user.friends.push("6760798763f3f626e0a2940d")
            user.friends.push("6759b7e6d7f3367a61d267ca")
            user.friends.push("6759b76cd7f3367a61d267c8")
            await user.save();
            res.status(200).json({ status: "success", message: "Friends list fetched successfully", friends: user.friends });
        } catch (error) {
            next();
            console.log("error in auth controller", error);
            res.status(500).json({ status: "error", message: error.message });  
        }
    }
    async getFriendsList(req: any, res: any, next: any): Promise<any> {
        try {
            const { user_id } = req.query;
            const errors = validationResult(req);
            console.log("user_id", user_id);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors });
            }
            const user = await User.findById(user_id);
            if (!user) {
                return res.status(404).json({ status: "error", message: "User not found." });
            }
            const friends = await User.find({ _id: { $in: user.friends } });
            res.status(200).json({ status: "success", message: "Friends list fetched successfully", friends });
        } catch (error) {
            next();
            console.log("error in auth controller", error);
            res.status(500).json({ status: "error", message: error.message });  
        }
    }
}

export default new FriendController;