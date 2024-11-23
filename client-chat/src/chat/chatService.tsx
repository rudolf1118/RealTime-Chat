import React, { useEffect, useState } from 'react';
import ChatWith from './chatWith';
import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import { socket } from '../App';

interface Message {
    user: string;
    message: string;
  }

const Chat: React.FC<{ username?: string, avatar?:any, online?:boolean, messages?:string }> = (props) => {
    const [chat, setChat] = useState<Message[]>([]);

    useEffect(() => {
        const handleMessage = (data: Message) => {
            setChat((prevChat) => [...prevChat, data]);
        };
        socket.on('receiveMessage', handleMessage);
    
        return () => {
            socket.off('receiveMessage', handleMessage);
        };
    }, []);

    return (<div className= "flex-col" >
            <div className="chat-header">
                <ChatWith username="John Doe" avatar="https://via.placeholder.com/150" online={true} message="Hello"/>
            </div>
            <div className="chat-body">
                {chat.map((msg, index) => (
                    <ChatMessage key={index} author={msg.user} messages={msg.message} />
                ))}
            </div>
            <div className="chat-footer">
                <ChatInput messages={props.messages || ''}/>
            </div>
        </div>
    );
};

export default Chat;
