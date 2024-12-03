import { Box, Container, TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState } from 'react';
import { socket } from './chatService';

interface Message {
  senderId: string;
  receiverId: string;
  text: string;
  timestamp?: string;
}

const ChatInput: React.FC<{onSendMessage: (text: string) => void}> = (props) => {
    const [message, setMessage] = useState<string>('');

    const sendMessage = () => {
      if (message.trim()) {
        props.onSendMessage(message);
        setMessage('');
      }
    }

    return (
        <Box display="flex" gap={2}>
    <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        onChange={(e) => setMessage(e.target.value)}
      />
      <IconButton sx={{":hover": {color: 'blue'}}} color="primary" onClick={sendMessage}>
        <SendIcon />
      </IconButton>
        </Box>
    )
};

export default ChatInput;
