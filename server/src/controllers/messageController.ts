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
        try {
            const { senderId, receiverId } = req.query;
            const messages = await Message.find({
                $or: [
                    { 'receiver.id': senderId, 'sender.id': receiverId },
                    { 'receiver.id': receiverId, 'sender.id': senderId }
                ]
            });
            console.log(messages);
            res.json(messages);
        } catch (error) {
            console.error(error);
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
