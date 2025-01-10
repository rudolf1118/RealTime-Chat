import { io, Socket } from 'socket.io-client';

export const socket: Socket = io('http://localhost:8080', {
    auth: {
        token: localStorage.getItem('token')
    }
});

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});