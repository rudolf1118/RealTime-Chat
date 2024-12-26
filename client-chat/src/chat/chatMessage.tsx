import { Paper, List, ListItem, ListItemText, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ChatWith from './chatWith';
// import { socket } from '../App';

interface Message {
    _id?: string;
    receiverId: string;
    senderId: string;
    text: string;
    timestamp: string;
  }

const ChatMessage: React.FC<{ messages: any }> = (props) => {
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
          marginTop: "20px"
        }}
      >
        <List>
          {props.messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${msg.senderId}: ${msg.text}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    )
};

export default ChatMessage;
