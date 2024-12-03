import React, { useEffect, useState } from "react";
import {Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { registerUser } from './authAPI';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [mail, setMail] = useState('');
    const [mailError, setMailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordConfirmErrorText, setPasswordConfirmErrorText] = useState('');
    const [username, setUsername] = useState('');
    const [duplicateError, setDuplicateError] = useState(false);
    const [duplicateErrorText, setDuplicateErrorText] = useState('');
    const [response, setResponse] = useState(null);
    const successIDs = [200, 201, 202];
    const navigate = useNavigate(); 

    useEffect(() => {
        if (response?.status && successIDs.some(id => id === response?.status)) {
            setUsername('');
            setMail('');
            setPassword('');
            setPasswordConfirm(''); 
        }
    }, [response]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const username = data.get('username') as string;
        
        setUsername(username);
        setMail(email);
        setPassword(password);
        
        await userCreating({ email, password, username });
    }

    const validation = () => {
        handleMailChange({target: {value: mail}});
        handlePasswordChange({target: {value: password}});
        handlePasswordConfirmChange({target: {value: passwordConfirm}});
    }

    const userCreating = async (user: {email: string, password: string, username: string}) => {
        validation();
        if (passwordConfirmError || passwordError || mailError || usernameError || !user.email || !user.password || !user.username) {
            return;
        }
        try {
            const response = await registerUser({username: user.username, email: user.email, password: user.password});
            if (response?.error === 'duplicate') {
                setDuplicateError(true);
                setDuplicateErrorText('Username or email already exists');
            } else {
                setDuplicateError(false);
                setDuplicateErrorText('');
            }
            if (response?.status && successIDs.some(id => id === response?.status)) {
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handlePasswordConfirmChange = e => {
        setPasswordConfirm(e?.target?.value);
        if (e?.target?.value?.length === 0 && password?.length === 0) {
            setPasswordConfirmError(false);
            setPasswordConfirmErrorText('');
        } 
        else if (password && e?.target?.value !== password) {
            setPasswordConfirmError(true);
            setPasswordConfirmErrorText('Passwords do not match');
        } else {
            setPasswordConfirmError(false);
            setPasswordConfirmErrorText('');
        }
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleMailChange = e => {
        setMail(e?.target?.value);
        const isValidEmail = e?.target?.value?.includes('@') && e?.target?.value?.includes('.') && e?.target?.value?.length > 0;
        setMailError(!isValidEmail);
    };

    const handlePasswordChange = e => {
        setPassword(e?.target?.value);
        const newPassword = e?.target?.value;
        const errors = [];

        if (newPassword?.length === 0 && password?.length === 0) {
            setPasswordError(false);
            setPasswordErrorText('');
        } 
        else {
            if (passwordConfirm && newPassword !== passwordConfirm) {
                errors.push('Passwords do not match');
            }
            if (newPassword?.length < 8 && newPassword?.length !== 0) {
                errors.push('Password must be at least 8 characters');
            }
            if (!/[A-Z]/.test(newPassword) || !/[^a-zA-Z0-9]/.test(newPassword)) {
                errors.push('Password must contain at least one uppercase letter and one special character');
            }
            
            if (errors.length > 0) {
                setPasswordError(true);
                setPasswordErrorText(errors.join(' and '));
            } else {
                setPasswordError(false);
                setPasswordErrorText('');
            }
        }
    }

    return (
        <Container maxWidth="xs" >
            <Paper elevation={10} sx={{ padding: 4, marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    We are glad to see you!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Please register to continue.
                </Typography>
                <Box component="form" 
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}>
                    <TextField 
                    placeholder="Enter your email" 
                    name="email" 
                    type="email" 
                    fullWidth 
                    autoFocus 
                    required
                    label="Email (Required)"
                    value={mail}
                    onChange={handleMailChange}
                    error={mailError || duplicateError}
                    helperText={
                      mailError ? "Please enter your email" : duplicateError ? duplicateErrorText : ""
                    }
                    sx={{ mt:2}} />
                    <TextField 
                    placeholder="Enter your username" 
                    name="username" 
                    type="text" 
                    fullWidth autoFocus required 
                    sx={{mb: 4, mt:2}} />
                    <TextField 
                    placeholder="Enter your password" 
                    name="password" 
                    type={showPassword ? "text" : "password"}
                    error={passwordError}
                    helperText={passwordErrorText}
                    onChange={handlePasswordChange}
                    fullWidth required
                    sx={{mb: 2}} />
                    <TextField 
                    placeholder="Enter your password again" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    onChange={handlePasswordConfirmChange}
                    helperText={passwordConfirmErrorText}
                    error={passwordConfirmError}
                    fullWidth required sx={{mb: 2}}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <FormControlLabel 
                        control={<Checkbox checked={showPassword} onChange={handleShowPassword} />} 
                        label={<Typography sx= {{fontSize: '12px'}} >Show Password</Typography>} 
                    />
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link component={RouterLink} to="/login" variant="body2">
                            Already have an account?
                        </Link>
                      </Grid>
                    </Grid>
                    </Box>
                    <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mt: 2 }}
                    disabled={passwordConfirmError || passwordError || mailError || usernameError}>
                        Register
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default RegistrationPage;