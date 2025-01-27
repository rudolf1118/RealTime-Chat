import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Server } from 'socket.io';
import Message from '../models/messageModel';
import { Message_Controller } from '../types/Controllers';
import { redisClient } from "../server";
import { logger } from '../utils/logger';

class MessageController implements Message_Controller {
    private io: Server | null = null;

    setSocket(socket: Server) {
        this.io = socket;
    }

    constructor() {
        this.getMessages = this.getMessages.bind(this);
        this.createMessage = this.createMessage.bind(this);
        this.checkingRedisCache = this.checkingRedisCache.bind(this);
        this.cachingMessagesToRedis = this.cachingMessagesToRedis.bind(this);
    }

    async getMessages(req: any, res: any): Promise<any> {
        try {
            const { senderId, receiverId } = req.query;
            const statusOfCaching = await this.checkingRedisCache(senderId, receiverId);
            logger.log(`Redis cache status: ${statusOfCaching.status}`);
            if (statusOfCaching.status === "already cached") {
                return res.json({messages: JSON.parse(statusOfCaching.data)});
            }
            const messages = await Message.find({
                $or: [
                    { 'receiver.id': senderId, 'sender.id': receiverId },
                    { 'receiver.id': receiverId, 'sender.id': senderId }
                ]
            });
            await this.cachingMessagesToRedis(messages, senderId, receiverId);
            res.json(messages);
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Error fetching messages' });
        }
    }
    
    async createMessage(messageData: any, socket: any): Promise<any> {
        try {
            const { senderId, receiverId, text, timestamp } = messageData;
            const message = new Message({ 
                sender: { id: senderId, username: senderId }, 
                receiver: { id: receiverId, username: receiverId }, 
                text, 
                timestamp 
            });
            await message.save();
            logger.log("Message saved");
            if (this.io) {
                this.io.to(receiverId).emit('receiveMessage', message);
            }
            return message;
        } catch (error) {
            logger.error(error);
            return { message: 'Error posting message' };
        }
    }

    async checkingRedisCache(senderId:string, receiverId:string): Promise<any> { 
        try {
            let cachedMessages = await redisClient.get(`${senderId}_${receiverId}_messages`);
            if (!cachedMessages) {
                cachedMessages = await redisClient.get(`${receiverId}_${senderId}_messages`);
            }
            if (cachedMessages) {
                return({status: "already cached", data: cachedMessages});
            }
            return({status: "not cached", data: null});
        } catch (error) {
            logger.log("error in caching friends to redis", error);
            throw error;
        }
    }

    async cachingMessagesToRedis(toCache:any, senderId:string, receiverId:string): Promise<any> { 
        try {
            const cachedMessages = await redisClient.get(`${senderId}_${receiverId}_messages`);
            if (cachedMessages) {
                return({status: "already cached", message: `Messages already cached, id: ${senderId}_${receiverId}`});
            }

            await redisClient.setEx(`${senderId}_${receiverId}_messages`, parseInt(process.env.REDIS_EXPIRE_TIME), JSON.stringify(toCache));
            logger.log("cached messages", toCache);
            return toCache;
        } catch (error) {
            logger.log("error in caching friends to redis", error);
            throw error;
        }
    }
}
export default new MessageController();
