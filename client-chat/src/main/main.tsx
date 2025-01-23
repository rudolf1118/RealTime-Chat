import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../auth/account/loginPage';
import RegistrationPage from '../auth/account/registrationPage';
import ProtectedRoute from '../auth/authProtected';
import LandingPage from './landing';
import Side from './side/sideComponents';
import AlreadySignedIn from '../auth/account/alreadySignedIn';

const Main: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const handleCreds = (user_id:any) => {
    setUserId(user_id);
  }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<AlreadySignedIn><LoginPage handleCreds={handleCreds} /></AlreadySignedIn>} />
                <Route path="/register" element={<AlreadySignedIn><RegistrationPage /></AlreadySignedIn>} />
                <Route element={<ProtectedRoute/>}>
                    <Route path="/main/*" element={<Side user_id={userId} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Main;
