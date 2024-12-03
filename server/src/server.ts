import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './auth/router';
import dotenv from 'dotenv';
import Message from './schemas/messages';
import MessageController from './messages/controller';
dotenv.config();
interface ChatMessage {
    user: string;
    message: string;
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
});

app.use(cors());
app.use(express.json());
app.use(authRouter);

// MongoDB Connection
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_SRV as string);
        console.log(`Connected to MongoDB ${process.env.MONGODB_SRV}`);
        server.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

MessageController.setSocket(io);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined their room`);
    });

    socket.on('sendMessage', async (messageData) => {
        console.log({messageData})
        const { senderId, receiverId, text, timestamp } = messageData;
        await MessageController.postMessage(messageData, socket);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
start();
