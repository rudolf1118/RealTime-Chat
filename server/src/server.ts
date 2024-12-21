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

dotenv.config();
export const app = express();
export const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api/friends", friendRouter);
app.use("/api/protected", protectedRoute);
app.use(morgan("dev")); // Log all requests to the console
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_SRV as string);
        console.log(`Connected to MongoDB`);
        server.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

start();
socketConnection(); 