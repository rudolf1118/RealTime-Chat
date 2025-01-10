import React, { useState } from "react";
import {Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import axios from "axios";
import { loginUser } from "../authAPI";
import { useNavigate } from 'react-router-dom';
import API from "../../config/APi";

const LoginPage = (props: { handleCreds: (user: any) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = async () => {
        setError("");
        try {
            const response = await loginUser(email, password); 
            if (response?.error?.includes("not found")) {
                setError("Password or email is incorrect.");
                return;
            }
            else if (response.error) {
                setError(response.error);
                return;
            }
            const { token } = response?.data;

            await localStorage.setItem('token', token);
            await API.initializeAPI();
            const { user_id } = response.data;
            props.handleCreds(user_id);

            navigate('/main');
        } catch (err: any) {
            console.error('Login error:', err.response?.data || err.message);
            setError(err.error || 'Login failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={10} sx={{ padding: 4, marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Welcome to the Namak
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Please log in to continue.
                </Typography>
                <Box component="form" 
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}>
                    <TextField placeholder="Enter your email" name="email" type="email" fullWidth autoFocus required sx={{mb: 2, mt:2}} onChange={(e) => setEmail(e.target.value)} />
                    <TextField placeholder="Enter your password" name="password" type={showPassword ? "text" : "password"} fullWidth required sx={{mb: 2}} onChange={(e) => setPassword(e.target.value)} />
                    {error && <Typography color="error" sx={{fontSize: '14px', mb:2, textAlign: 'left' }}>{error}</Typography>}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <FormControlLabel 
                        control={<Checkbox checked={showPassword} onChange={handleShowPassword} />} 
                        label={<Typography sx= {{fontSize: '12px'}} >Show Password</Typography>} 
                    />
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link component={RouterLink} to="/register" variant="body2">
                            Don't have an account?
                        </Link>
                      </Grid>
                    </Grid>
                    </Box>
                    <Button 
                    type="submit" variant="contained" onClick={handleLogin} color="primary" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default LoginPage;