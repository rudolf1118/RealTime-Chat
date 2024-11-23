import React, { useState } from 'react';
import { socket } from '../App';

interface Message {
    user: string;
    message: string;
  }

const ChatInput: React.FC<{ messages: string }> = (props) => {
    const [message, setMessage] = useState<string>('');
    const [chat, setChat] = useState<Message[]>([]);
    const handleMessage = (data: Message) => {
        setChat((prevChat) => [...prevChat, data]);
    };
    
    return <div className="flex items-center gap-2">
        <input type="text" value={message} placeholder="Write a message" onChange={(e) => setMessage(e.target.value)} />
        <button onClick={() => {
            socket.emit('sendMessage', { user: 'John Doe', message });
            setMessage('');
        }}>Send</button>
    </div>;
};

export default ChatInput;
