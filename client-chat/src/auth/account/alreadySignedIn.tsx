import React, { useState , useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { validateToken } from '../authAPI';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

const AlreadySignedIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
        const tokenChecker = async (token: string) => {
            const request = await validateToken(token);
            setIsValid(request);
            setIsLoading(false);
        };
        if (token) {
            (async () => await tokenChecker(token))();
        } else {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress sx={{ marginBottom: '20px' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0000FF' }}>Redirecting...</Typography>
                </Box>
            </Box>
        );
    }
    return isValid ? <Navigate to="/main" replace /> : <>{children}</>;
};

export default AlreadySignedIn;
