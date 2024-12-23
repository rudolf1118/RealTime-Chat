import React, { useEffect, useState } from 'react';
import ChatWith from './chatWith';
import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import { getMessages, postMessages } from './chatAPI';
import { Container, Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Navbar from '../navbar/navbar';
import { io, Socket } from 'socket.io-client';

interface Message {
    _id ?: string;
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

const Chat: React.FC<{ username?: string, online?:boolean, messages?:Message[] }> = (props) => {
    const [chat, setChat] = useState<Message[]>(props.messages || []);
    const [receiverId, setReceiverId] = useState<string>(getUserIdFromURL());
    const senderId = props.username;

    useEffect(() => {
        const fetchMessages = async () => {
            const messages = await getMessages(senderId, receiverId);
            console.log(messages);
            setChat(messages);
        };
        fetchMessages();
      }, [senderId, receiverId]);
    
    useEffect(() => {
        setChat(props.messages || []);
    }, [props.messages]);

    useEffect(() => {
        socket.emit('joinRoom', senderId);
        const handleMessage = (data: Message) => {
            if (data.senderId !== senderId) {
                setChat((prevChat: Message[]) => [...prevChat, data]);
            }
        };
        socket.on('receiveMessage', handleMessage);
    
        return () => {
            socket.off('receiveMessage', handleMessage);
        };
    }, [senderId, receiverId]);

    const sendMessage = (text: string) => {
        const newMessage: Message = {
            senderId,
            receiverId,
            text,
            timestamp: Date.now().toString(),
        };
        socket.emit('sendMessage', newMessage);
        setChat((prevChat: Message[]) => [...prevChat, newMessage]);
    }

    return (
        <Container className="MuiContainer-root">
            <Navbar />
            <Box display="flex" flexDirection="column">
                <ChatWith username={props.username || ''} online={props.online || false} />
                <ChatMessage messages={chat} />
                <ChatInput onSendMessage={sendMessage} />
            </Box>
        </Container>
    );
};

export default Chat;
