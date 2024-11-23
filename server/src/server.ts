import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';


interface ChatMessage {
    user: string;
    message: string;
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: `http://localhost:${process.env.PORT}`, methods: ['GET', 'POST'] },
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_SRV);
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
        io.emit('receiveMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

start();
