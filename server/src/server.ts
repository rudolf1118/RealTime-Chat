import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import { logger } from './utils/logger';
import userRouter from './routes/userRoutes';
import dotenv from 'dotenv';
import { webSocket }from './WebSocket/socketConnection';
import protectedRoute from './routes/protectedRoute';
import friendRouter from './routes/friendRoutes';
import morgan from 'morgan';
import messageRouter from './routes/messageRoutes';
import { createClient } from 'redis';


dotenv.config();
export const app = express();
export const server = http.createServer(app);
const redisClient = createClient({
    url: process.env.REDIS_URL,
});

// Configure CORS with specific options
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // Allow your client origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true // Allow credentials
}));

app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api/friends", friendRouter);
app.use("/api/protected", protectedRoute);
app.use("/api/messages", messageRouter);
app.use(morgan("dev")); // Log all requests to the console

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_SRV as string);
        webSocket.init(server);
        logger.log('Connected to MongoDB');
        redisClient.on('error', (err) => logger.error('Redis Client Error', err));
        await redisClient.connect();
        server.listen(process.env.PORT, () => {
            logger.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
       logger.error(error);
    }
};
export { redisClient };
start();