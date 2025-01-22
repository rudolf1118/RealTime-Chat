import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/messageRoutes';
import userRouter from './routes/userRoutes';
import dotenv from 'dotenv';
import { socketConnection }from './WebSocket/socketConnection';
import { Server } from 'socket.io';
import protectedRoute from './routes/protectedRoute';
import friendRouter from './routes/friendRoutes';
import morgan from 'morgan';
import messageRouter from './routes/messageRoutes';
import redis from 'redis';
import { createClient } from 'redis';


dotenv.config();
export const app = express();
export const server = http.createServer(app);
const redisClient = createClient({
    url: process.env.REDIS_URL,
});
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api/friends", friendRouter);
app.use("/api/protected", protectedRoute);
app.use("/api/messages", messageRouter);
app.use(morgan("dev")); // Log all requests to the console
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_SRV as string);
        console.log(`Connected to MongoDB`);
        redisClient.on('error', (err) => console.log('Redis Client Error', err));
        await redisClient.connect();
        server.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};
export { redisClient };
start();
socketConnection(); 