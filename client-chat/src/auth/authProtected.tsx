import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { validateToken } from './authAPI';
import { Box } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Typography } from '@mui/material';

// interface ProtectedRouteProps {
//     children: React.ReactNode;
// }

const ProtectedRoute: React.FC<any> = () => {
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const tokenChecker = async (token: string) => {
            const request = await validateToken(token);
            setIsValid(request);
            setIsLoading(false);
        };
        if (token) {
            (async () => await tokenChecker(token))();
            console.log("token is valid")
        } else {
            setIsValid(false);
            setIsLoading(false);
        }
    }, [location]); // Re-run effect when location changes
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress sx={{ marginBottom: '20px' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0000FF' }}>Loading...</Typography>
                </Box>
            </Box>
        );
    }
    if (!isValid) localStorage.removeItem('token');
    return isValid ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;