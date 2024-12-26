import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../auth/loginPage';
import RegistrationPage from '../auth/registrationPage';
import ProtectedRoute from '../auth/authProtected';
import LandingPage from './landing';
import Side from './sideComponents';
import Chat from '../chat/chatService';
import AlreadySignedIn from '../auth/alreadySignedIn';
import Logout from '../auth/logout';
import ChatList from '../chat/chatList';

const Main: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const handleCreds = (user_id:any) => {
    setUserId(user_id);
  }
  console.log("THIS IS USER_ID", userId);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<AlreadySignedIn><LoginPage handleCreds={handleCreds} /></AlreadySignedIn>} />
                <Route path="/register" element={<AlreadySignedIn><RegistrationPage /></AlreadySignedIn>} />
                <Route path="/main/*" element={<ProtectedRoute><Side user_id={userId} /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Main;
