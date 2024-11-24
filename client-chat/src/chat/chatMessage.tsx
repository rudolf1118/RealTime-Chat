import { Paper, List, ListItem, ListItemText, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ChatWith from './chatWith';
// import { socket } from '../App';

interface Message {
    user: string;
    message: string;
  }

const ChatMessage: React.FC<{ messages: Message[] }> = (props) => {
    console.log("messages", props.messages)
    return (
        <Paper
        elevation={3}
        sx={{
          height: '60vh',
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          mb: 2,
        }}
      >
        <List>
          {props.messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${msg.user}: ${msg.message}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    )
};

export default ChatMessage;
