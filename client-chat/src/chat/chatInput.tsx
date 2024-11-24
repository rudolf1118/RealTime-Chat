import { Box, Container, TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState } from 'react';
import { socket } from '../App';

interface Message {
    user: string;
    message: string;
  }

const ChatInput: React.FC<{}> = (props) => {
    const [message, setMessage] = useState<string>('');

    const sendingMessage = (message: string) => {
        socket.emit('sendMessage', {user: "me", message: message});
        setMessage('');
    };

    return (
        <Box display="flex" gap={2}>
    <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                sendingMessage(message);
                setMessage('');
            }
        }}
        onChange={(e) => setMessage(e.target.value)}
      />
      <IconButton sx={{":hover": {color: 'blue'}}} color="primary" onClick={() => {
        sendingMessage(message);
        setMessage('');
      }}>
        <SendIcon />
      </IconButton>
        </Box>
    )
};

export default ChatInput;
