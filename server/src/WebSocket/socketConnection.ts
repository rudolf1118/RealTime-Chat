import { Server } from 'socket.io';
import MessageController from '../controllers/messageController';
import { server } from '../server';
import { NewMessage } from '../types/UtilTypes';
import FriendController from '../controllers/friendController';

export function socketConnection() {
    
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'DELETE'],
            allowedHeaders: ['Content-Type'],
            credentials: true
        }
    });

    MessageController.setSocket(io);
    FriendController.setSocket(io);

    io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (userId: string) => {
        socket.join(userId);
        console.log(`User ${userId} joined their room`);
    });

    socket.on('sendMessage', async (messageData: NewMessage) => {
        await MessageController.createMessage(messageData, socket);
    });
    socket.on('friendAccepted', (userId: string, username: string) => {
        FriendController.acceptFriendRequest(userId, username, socket);
        socket.emit('friendAccepted', { userId, username });
    });
    // socket.on('sendFriendRequest', (username: string) => {
    //     FriendController.sendFriendRequest(username, socket);
    //     socket.emit('sendFriendRequest', { username });
    // });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
    });
}