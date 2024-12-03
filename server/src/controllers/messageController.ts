import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Server } from 'socket.io';
import Message from '../models/messageModel';
import { Message_Controller } from '../types/Controllers';

class MessageController implements Message_Controller {
    private io: Server | null = null;

    setSocket(socket: Server) {
        this.io = socket;
    }

    async getMessages(req: any, res: any): Promise<any> {
        const { senderId, receiverId } = req.query;
        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        });
        res.json(messages);
    }
    
    async createMessage(messageData: any, socket: any): Promise<any> {
        try {
            const { senderId, receiverId, text, timestamp } = messageData;
            const message = new Message({ 
                senderId: senderId, 
                receiverId: receiverId, 
                text, 
                timestamp 
            });
            await message.save();
            console.log("Message saved");
            if (this.io) {
                this.io.to(receiverId).emit('receiveMessage', message);
            }
            return message;
        } catch (error) {
            console.error(error);
            return { message: 'Error posting message' };
        }
    }
}
export default new MessageController;
