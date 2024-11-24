import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  styled,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { io, Socket } from 'socket.io-client';
import Navbar from './navbar/navbar';
import Chat from './chat/chatService';

interface Message {
  user: string;
  text: string;
}

export const socket: Socket = io('http://localhost:8080');

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('receiveMessage', (msg: Message) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = { user: 'User1', text: message };
      socket.emit('sendMessage', newMessage);
      setMessage('');
    }
  };

  return (
        <Chat username="Andrew Petrov" messages={[]} online={true}/>
  );
  
};

export default App;
