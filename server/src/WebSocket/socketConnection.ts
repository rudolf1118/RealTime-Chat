import { Server } from 'socket.io';
import MessageController from '../controllers/messageController';
import { server } from '../server';
import { NewMessage } from '../types/UtilTypes';

export function socketConnection() {
    
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type'],
            credentials: true
        }
    });

    MessageController.setSocket(io);

    io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (userId: string) => {
        socket.join(userId);
        console.log(`User ${userId} joined their room`);
    });

    socket.on('sendMessage', async (messageData: NewMessage) => {
        await MessageController.createMessage(messageData, socket);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
    });
}