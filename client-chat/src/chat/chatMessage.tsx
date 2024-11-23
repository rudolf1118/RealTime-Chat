import React, { useEffect, useState } from 'react';
import { socket } from '../App';

interface Message {
    user: string;
    message: string;
  }

const ChatMessage: React.FC<{ author: string, messages: string }> = (props) => {
    const [chat, setChat] = useState<Message[]>([]);
        
    return <div className= "flex w-full border-4 border-gray-500" style={{ height: `${chat?.length || 10 * 20}px` }}>
        <span>{props.author}</span>
        <span>{props.messages}</span>
    </div>;
};

export default ChatMessage;
