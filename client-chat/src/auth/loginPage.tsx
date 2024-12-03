import React, { useState } from "react";
import {Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        console.log(email, password);
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
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
                    <TextField placeholder="Enter your email" name="email" type="email" fullWidth autoFocus required sx={{mb: 2, mt:2}} />
                    <TextField placeholder="Enter your password" name="password" type={showPassword ? "text" : "password"} fullWidth required sx={{mb: 2}} />
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
                    type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default LoginPage;