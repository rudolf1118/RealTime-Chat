import { Server } from 'socket.io';
import MessageController from '../controllers/messageController';
import { server } from '../server';
import { NewMessage } from '../types/UtilTypes';
import FriendController from '../controllers/friendController';
import verifySocketToken from '../auth/middlewares/authMiddlewareWebSocket';
import {redisClient }from '../server';
import { getUserIdFromToken } from '../Utils/helperFunctions';

export function socketConnection() {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type'],
            credentials: true
        }
    });

    MessageController.setSocket(io);
    FriendController.setSocket(io);
    io.use(verifySocketToken);
    io.on('connection',  (socket) => {
        console.log('User connected:', socket.id);
        const token = socket.handshake.auth.token; 
        const user_id = getUserIdFromToken(token);
    
        redisClient.set(`online:${user_id}`, JSON.stringify({
            status: 'online',
            user_id: user_id,
            socketId: socket.id
        }));
        console.log(`User ${user_id} connected`);
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

        const intervalId = setInterval(() => {
            redisClient.expire(`online:${user_id}`, 3600);
        }, 30000);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            redisClient.del(`online:${user_id}`);
            clearInterval(intervalId);
        });
    });
}