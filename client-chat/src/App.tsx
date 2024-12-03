import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import Chat from './chat/chatService';
import { getMessages } from './chat/chatAPI';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import LoginPage from './auth/loginPage';
import RegistrationPage from './auth/registrationPage';

interface Message {
  senderId: string;
  receiverId: string;
  text: string;
  timestamp?: string;
}

const getUserIdFromURL = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('user') || 'guest';
};

const App: React.FC = () => {
  const [chat, setChat] = useState<Message[]>([]);
  const [receiverId, setReceiverId] = useState<string>(getUserIdFromURL());
  const senderId = receiverId === 'user1' ? 'user2' : 'user1';

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/chat" element={<Chat username="" online={true} />} />
    </Routes>
  </BrowserRouter>
  );
  
};

export default App;
