import config from "../auth/tokenGeneration/config";
import User from "../models/userModel";
import { Friend_Controller } from "../types/Controllers";
import { ModuleRes } from "../types/UtilTypes";
import { validationResult } from 'express-validator';
import jwt from "jsonwebtoken";
import AuthController from "./authController";
import { isValidEmail, removePasswordFromUser } from "../Utils/helperFunctions";
import FriendRequest from "../models/friendRequestModel";
import { Server } from 'socket.io';
import { redisClient } from "../server";
import { promisify } from 'util';

class FriendController implements Friend_Controller {
    private io: Server | null = null;
    private getAsync: any;

    setSocket(socket: Server) {
        this.io = socket;
    }

    // constructor() {
    //     this.getAsync = promisify(redisClient.get).bind(redisClient);
    // }

    async addFriend(req: any, res: any, next: any): Promise<ModuleRes> {
        try {
            const { friend_name } = req.body;
            const user_id = await AuthController.getUserIdFromToken(req);
            const user = await User.findById(user_id);
            if (!user) {
                return res.status(404).json({ status: "error", message: "User not found." });
            }
            const friend = await User.findOne({ username: friend_name });
            if (!friend) {
                return res.status(404).json({ status: "error", message: "Friend not found." });
            }
            if (user.friends.includes(friend._id)) {
                return res.status(400).json({ status: "error", message: "Friend already added." });
            }
            user.friends.push(friend._id);
            await user.save();
            res.status(200).json({ status: "success", message: "Friend added successfully", friend: friend });
        } catch (error) {
            next();
            console.log("error in auth controller", error);
            res.status(500).json({ status: "error", message: error.message });  
        }
    }
    async getFriendById(req: any, res: any, next: any): Promise<ModuleRes> {
        try {
            const { friend_id } = req.query;
            console.log("friend_id", friend_id);
            const friend = await User.findById(friend_id);
            if (!friend) {
                return res.status(404).json({ status: "error", message: "Friend not found." });
            }
            const { password, ...rest } = friend.toObject();
            return res.status(200).json({ status: "success", message: "Friend fetched successfully", friend: rest });
        } catch (error) {
            next();
            console.log("error in friend controller", error);
            res.status(500).json({ status: "error", message: error.message });  
        }
    }
    async getFriendsList(req: any, res: any, next: any): Promise<ModuleRes> {
        try {
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
            const statusOfCaching = await this.checkingRedisCache(user_id);
            console.log(`Redis cache status: ${statusOfCaching.status}`);
            if (statusOfCaching.status === "already cached") {
                return res.status(200).json({ status: "success", friends: JSON.parse(statusOfCaching.data) });
            }
            const friends = await User.find({ _id: { $in: user.friends } });
            const sensFriends = friends?.map((friend:any) => {
                const { password, ...rest } = friend.toObject();
                console.log("rest", rest);
                return rest;
            });
            await this.cachingFriendsToRedis(sensFriends, user_id);
            res.status(200).json({ status: "success", message: "Friends list fetched successfully", friends: sensFriends });
        } catch (error) {
            next();
            console.log("error in friend controller", error);
            res.status(500).json({ status: "error", message: error.message });  
        }
    }
    async deleteFriend(req: any, res: any, next: any): Promise<ModuleRes> {
        try {
            const { friend_id } = req.body;
            const errors = validationResult(req);
            const user_id = await AuthController.getUserIdFromToken(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors });
            }
            const user = await User.findById(user_id);
            if (!user) {
                return res.status(404).json({ status: "error", message: "User not found." });
            }
            user.friends = user.friends.filter((id) => id.toString() !== friend_id);
            await user.save();
            res.status(200).json({ status: "success", message: "Friend deleted successfully" });
        } catch (error) {
            next();
            console.log("error in friend controller", error);
            res.status(500).json({ status: "error", message: error.message });  
        }
    }
    async sendFriendRequest (userInfo:any, res:any, next:any): Promise<ModuleRes> {
        try {
            console.log(userInfo.userInfo)
            const user_id = await AuthController.getUserIdFromToken({userInfo, isSocket: true});
            const user = await User.findById(user_id);
            const receiver = await User.findOne({ $or: [{ username: userInfo.userInfo }, { email: userInfo.userInfo }] });
            if (!user || !receiver) {
                return ({ status: "error", message: `User not found with id ${!userInfo ? user_id : userInfo}` });
            }
            if (user.friendRequests.some((request:any) => request.receiverId === receiver._id)) {
                return ({ status: "error", message: "Friend request already sent." });
            }
            if (receiver.friendRequests.some((request:any) => request.senderId === user_id)) {
                return ({ status: "error", message: "Friend request already sent." });
            }
            const friendRequest = new FriendRequest({
                senderId: user._id,
                receiverId: receiver._id,
                status: "pending"
            });
            receiver.friendRequests.push({senderId:user_id, status:"pending"});
            await friendRequest.save();
            await receiver.save();
            console.log("friendRequest", friendRequest);
            console.log("Friend request sent successfully");
            return ({ status: "success", message: "Friend request sent successfully" });
        } catch (error) {
            console.log("error in friend controller", error);
            return({ status: "error", message: error?.message || error });  
        }
    }
    async getFriendRequests(req:any, res:any, next:any): Promise<ModuleRes | any> {
        try {
            const user_id = await AuthController.getUserIdFromToken(req);
            const friendRequests = await FriendRequest.find({ receiverId: user_id });
            res.status(200).json({ status: "success", message: "Friend requests fetched successfully", friendRequests: friendRequests });
        } catch (error) {
            next();
            console.log("error in friend controller", error);
            res.status(500).json({ status: "error", message: error?.message || error });  
        }
    }
    async acceptFriendRequest(req:any, res:any, next:any): Promise<ModuleRes | any> {
            try {
                const { friendRequestId } = req.body;
                const friendRequest = await FriendRequest.findById(friendRequestId);
                if (!friendRequest) {
                    return res.status(404).json({ status: "error", message: "Friend request not found." });
                }
                friendRequest.status = "accepted";
                await friendRequest.save();
                return { status: "success", message: "Friend request accepted successfully" };
            } catch (error) {
                next();
                console.log("error in friend controller", error);
            res.status(500).json({ status: "error", message: error.message });  
        }
    }

    async cachingFriendsToRedis(toCache:any, user_id:string): Promise<any> { 
        try {
            const cachedFriends = await redisClient.get(`${user_id}_friends`);
            if (cachedFriends) {
                return({status: "already cached", message: `Friends already cached, id: ${user_id}`});
            }

            await redisClient.setEx(`${user_id}_friends`, parseInt(process.env.REDIS_EXPIRE_TIME), JSON.stringify(toCache));
            console.log("cached friends", toCache);
            return toCache;
        } catch (error) {
            console.log("error in caching friends to redis", error);
            throw error;
        }
    }

    async checkingRedisCache(user_id:string): Promise<any> { 
        try {
            const cachedFriends = await redisClient.get(`${user_id}_friends`);
            if (cachedFriends) {
                return({status: "already cached", data: cachedFriends});
            }
            return({status: "not cached", data: null});
        } catch (error) {
            console.log("error in caching friends to redis", error);
            throw error;
        }
    }
}

export default new FriendController();