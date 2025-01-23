import React, { useEffect, useState } from 'react';
import ChatWith from './chatWith';
import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import { getMessages, postMessages } from './chatAPI';
import { Container, Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Navbar from '../navbar/navbar';
import { io, Socket } from 'socket.io-client';
import { getFriendById } from '../friends/friendsAPI';
import { getUser } from '../auth/authAPI';
import { socket } from '../socket/connection';
interface Message {
    _id ?: string;
    senderId: string;
    receiverId: string;
    text: string;
    timestamp?: string;
  }

const getUserIdFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    return id ? atob(id) : '';
};

const Chat: React.FC<{ username?: string, online?:boolean, messages?:Message[] }> = (props) => {
    const [chat, setChat] = useState<Message[]>([]);
    const [receiver, setReceiver] = useState<any>({});
    const [receiverId, setReceiverId] = useState<string>("");
    const [sender, setSender] = useState<any>({});
    const [senderId, setSenderId] = useState<string>("");

    useEffect(()=>{
        const fetch = async () => {
            const [sender, receiver] = await Promise.all([getUser(), getFriendById(getUserIdFromURL())]);
            setSender(sender);
            setSenderId(sender._id);
            setReceiver(receiver);
            setReceiverId(receiver._id);
            const messages = await getMessages(sender._id, receiver._id);
            setChat(messages.length > 0 ? messages : []);
        }
        (async () => await fetch())();
    }, [])

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
            senderId: senderId,
            receiverId: receiverId,
            text,
            timestamp: Date.now().toString(),
        };
        socket.emit('sendMessage', newMessage);
        setChat((prevChat: Message[]) => [...prevChat, newMessage]);
    }

    return (
            <Box sx= {{display: "flex", flexDirection: "column", height: "100vh", marginLeft: "80px", marginTop: "0px", marginBottom: "20px" }}>
                <ChatWith username={receiver.username || ''} online={receiver.online || false} />
                <ChatMessage messages={chat} senderName={sender.username || ''} />
                <ChatInput onSendMessage={sendMessage} />
            </Box>
    );
};

export default Chat;
