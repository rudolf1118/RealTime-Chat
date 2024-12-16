import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import Chat from '../chat/chatService';
import { getMessages } from '../chat/chatAPI';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../auth/loginPage';
import RegistrationPage from '../auth/registrationPage';
import ProtectedRoute from '../auth/authProtected';
import Sidebar from './sidebar';

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

const Main: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/chat" element={<ProtectedRoute><Chat username="" online={true} /></ProtectedRoute>} />
      <Route path="/main" element={<ProtectedRoute><Sidebar /></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
  );
  
};

export default Main;
