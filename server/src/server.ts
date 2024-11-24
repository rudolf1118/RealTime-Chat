import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './auth/authRouter';
import dotenv from 'dotenv';
dotenv.config();
interface ChatMessage {
    user: string;
    message: string;
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors:{origin: `*`}});

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);

// MongoDB Connection
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_SRV as string);
        server.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('sendMessage', (data: ChatMessage) => {
        console.log(data)
        io.emit('receiveMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

start();
