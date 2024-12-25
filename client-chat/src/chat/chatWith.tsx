import React from 'react';
import ProfileIcon from './profileIcon';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

const ChatWith: React.FC<{ username: string, online: boolean }> = (props) => {
    return (
        <Box display="flex" gap={2}>
            <ProfileIcon username={props.username} online={true} />
            <Typography sx={{fontWeight: 'semibold', color: 'black'}} variant="h6">{props.username || "Andrew Petrov"}</Typography>
        </Box>
    )
};

export default ChatWith;
