import { Server } from 'socket.io';
import MessageController from '../controllers/messageController';
import { logger } from '../utils/logger';
import { NewMessage } from '../types/UtilTypes';
import FriendController from '../controllers/friendController';
import verifySocketToken from '../auth/middlewares/authMiddlewareWebSocket';
import {redisClient }from '../server';
import { getUserIdFromToken } from '../utils/helperFunctions';

class WebSocketServer {
    private static instance: WebSocketServer;
    private io: Server | null = null;

    private constructor() {}

    public static getInstance(): WebSocketServer {
        if (!WebSocketServer.instance) {
            WebSocketServer.instance = new WebSocketServer();
        }
        return WebSocketServer.instance;
    }

    public init(server: any): void {
        if (!this.io) {
            this.io = new Server(server, {
                cors: {
                    origin: '*',
                    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
                    allowedHeaders: ['Content-Type'],
                    credentials: true
                }
            });

            MessageController.setSocket(this.io);
            FriendController.setSocket(this.io);
            this.io.use(verifySocketToken);
            this.io.on('connection', (socket) => {
                logger.log('User connected:', socket.id);
                const token = socket.handshake.auth.token;
                const user_id = getUserIdFromToken(token);

                redisClient.set(`online:${user_id}`, JSON.stringify({
                    status: 'online',
                    user_id: user_id,
                    socketId: socket.id
                }));
                logger.log(`User ${user_id} connected`);
                socket.on('joinRoom', (userId: string) => {
                    socket.join(userId);
                    logger.log(`User ${userId} joined their room`);
                });

                socket.on('sendMessage', async (messageData: NewMessage) => {
                    await MessageController.createMessage(messageData, socket);
                });

                socket.on('friendAccepted', async (userId: string, username: string) => {
                    await FriendController.acceptFriendRequest(userId, username, socket);
                    socket.emit('friendAccepted', { userId, username });
                });

                socket.on('sendFriendRequest', async (userInfo: string) => {
                    logger.log(userInfo);
                    const request = await FriendController.sendFriendRequest({ userInfo, authorization: token }, socket, this.io);
                    socket.emit('friendRequestResponse', { request });
                    socket.emit('receiveFriendRequest', { request });
                });

                const intervalId = setInterval(() => {
                    redisClient.expire(`online:${user_id}`, 3600);
                }, 30000);

                socket.on('disconnect', () => {
                    logger.log('User disconnected:', socket.id);
                    redisClient.del(`online:${user_id}`);
                    clearInterval(intervalId);
                });
            });

            logger.log('WebSocket initialized');
        }
    }

    public getIo(): Server | null {
        return this.io;
    }
}

export const webSocket = WebSocketServer.getInstance();