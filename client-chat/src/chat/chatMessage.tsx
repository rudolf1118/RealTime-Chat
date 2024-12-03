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

/*
_id: "674f452e86844a0befc4b1ec"
​​
receiverId: "user2"
​​
senderId: "user1"
​​
text: "Привет, как дела?"
​​
timestamp: "2024-11-24T12:00:00.000Z"
*/
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
