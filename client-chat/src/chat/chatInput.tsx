import React, { useState } from 'react';
import { socket } from '../App';

const ChatInput: React.FC<{ messages: string }> = (props) => {
    const [message, setMessage] = useState<string>('');


    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('sendMessage', { user: 'User', message });
            setMessage('');
        }
    };
    return <div className="flex items-center gap-2">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write a message" />
        <button onClick={sendMessage}>Send</button>
    </div>;
};

export default ChatInput;
