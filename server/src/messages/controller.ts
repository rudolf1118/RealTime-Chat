import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Server } from 'socket.io';
import Message from '../schemas/messages';
import { Controller } from '../types/Controllers';

class MessageController implements Controller {
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
    
    async postMessage(messageData: any, socket: any): Promise<any> {
        console.log("im in POST MESSAGE")
        try {
            const { senderId, receiverId, text, timestamp } = messageData;
            const message = new Message({ 
                senderId: senderId, 
                receiverId: receiverId, 
                text, 
                timestamp 
            });
            await message.save();
            console.log("this is message",message)
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
