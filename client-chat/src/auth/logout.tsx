import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../config/APi";

const Logout = ({handleLogout}:{handleLogout:any}) => {
    const navigate = useNavigate();

    const loggedOut = async () => {
        await localStorage.removeItem("token");
        await API.initializeAPI();
        navigate("/");
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px',borderRadius: '8px', boxShadow: 3,  height:"100%", width:"100%", backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
            <Box sx = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px',borderRadius: '8px', boxShadow: 3,  height:"100%", width:"100%", backgroundColor: 'rgba(211, 211, 211, 0.5)' }} >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: '16px' }}>
                Are you sure you want to log out?
            </Typography>
            <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
            <Button onClick={loggedOut} variant="contained" color="primary" sx={{ marginBottom: '8px', marginRight: '8px' }}>
                Yes
                </Button>
                <Button onClick={()=>handleLogout("canceled")} variant="contained" sx={{ marginBottom: '8px', marginLeft: '8px' }} color="secondary">
                    No
                </Button>
            </Container>
            </Box>
        </Box>
    )
}

export default Logout;