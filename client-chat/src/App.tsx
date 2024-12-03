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
import { getMessages } from './chat/chatAPI';

interface Message {
  senderId: string;
  receiverId: string;
  text: string;
  timestamp?: string;
}

export const socket: Socket = io('http://localhost:8080');

const getUserIdFromURL = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('user') || 'guest';
};

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<Message[]>([]);
  const [receiverId, setReceiverId] = useState<string>(getUserIdFromURL());
  const senderId = receiverId === 'user1' ? 'user2' : 'user1';

  useEffect(() => {
    getMessages(senderId, receiverId).then((messages) => {
      setChat(messages);
    });
  }, []);

  return (
        <Chat username="Andrew Petrov" messages={chat} online={true}/>
  );
  
};

export default App;
