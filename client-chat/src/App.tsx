import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import ChatService from './chat/chatService';


interface ChatMessage {
  user: string;
  message: string;
}

export const socket: Socket = io(`http://localhost:5000`);


const App: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [chat, setChat] = useState<ChatMessage[]>([]);

    useEffect(() => {
        socket.on('receiveMessage', (data: ChatMessage) => {
            setChat((prevChat) => [...prevChat, data]);
        });
    }, [chat]);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('sendMessage', { user: 'User', message });
            setMessage('');
        }
    };
    return <div><ChatService messages={message} /></div>;
};

export default App;
