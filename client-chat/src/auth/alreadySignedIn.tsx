import React from 'react';
import { Navigate } from 'react-router-dom';

const AlreadySignedIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/main" replace /> : <>{children}</>;
};

export default AlreadySignedIn;
