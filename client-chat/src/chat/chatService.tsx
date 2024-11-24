import React, { useEffect, useState } from 'react';
import ChatWith from './chatWith';
import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import { Container, Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Navbar from '../navbar/navbar';
import { socket } from '../App';

interface Message {
    user: string;
    message: string;
  }

const Chat: React.FC<{ username?: string, online?:boolean, messages?:Message[] }> = (props) => {
    const [chat, setChat] = useState<Message[]>(props.messages || []);
    useEffect(() => {
        const handleMessage = (data: Message) => {
            setChat((prevChat) => [...prevChat, data]);
        };
        socket.on('receiveMessage', handleMessage);
    
        return () => {
            socket.off('receiveMessage', handleMessage);
        };
    }, []);

    return (
        <Container className="MuiContainer-root">
            <Navbar />
            <Box display="flex" flexDirection="column">
                <ChatWith username={props.username || ''} online={props.online || false} />
                <ChatMessage messages={chat} />
                <ChatInput />
            </Box>
        </Container>
    );
};

export default Chat;
