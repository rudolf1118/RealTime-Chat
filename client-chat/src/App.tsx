import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import ChatService from './chat/chatService';


interface ChatMessage {
  user: string;
  message: string;
}

export const socket: Socket = io(`ws://localhost:8080`);


const App: React.FC = () => {
    const [message, setMessage] = useState<string>('');

    return <div><ChatService messages={message} /></div>;
};

export default App;
