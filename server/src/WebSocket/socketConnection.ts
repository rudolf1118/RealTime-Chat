import { Server } from 'socket.io';
import MessageController from '../controllers/messageController';
import { server } from '../server';
import { NewMessage } from '../types/UtilTypes';
import FriendController from '../controllers/friendController';
import verifySocketToken from '../auth/middlewares/authMiddlewareWebSocket';

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
    io.use(verifySocketToken);
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        const token = socket.handshake.auth.token; 
        socket.on('joinRoom', (userId: string) => {
            socket.join(userId);
            console.log(`User ${userId} joined their room`);
        });

        socket.on('sendMessage', async (messageData: NewMessage) => {
            await MessageController.createMessage(messageData, socket);
        });

        socket.on('friendAccepted', async (userId: string, username: string) => {
            await FriendController.acceptFriendRequest(userId, username, socket);
            socket.emit('friendAccepted', { userId, username });
        });

        socket.on('sendFriendRequest', async (userInfo: string) => {
            console.log(userInfo);
            const request = await FriendController.sendFriendRequest({ userInfo, authorization: token }, socket, io);
            socket.emit('friendRequestResponse', { request });
            socket.emit('receiveFriendRequest', { request });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
}