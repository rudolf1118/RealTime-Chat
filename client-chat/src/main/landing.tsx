import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Namak
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Connect with your friends and colleagues in real-time.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mr: 2 }}>
          Login
        </Button>
        <Button variant="outlined" color="primary" onClick={handleRegister}>
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
