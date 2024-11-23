import React from 'react';
import ChatWith from './chatWith';
import ChatMessage from './chatMessage';
import ChatInput from './chatInput';

const Chat: React.FC<{ username?: string, avatar?:any, online?:boolean, messages?:string }> = (props) => {
    return (<div className= "flex-col" >
            <div className="chat-header">
                <ChatWith username="John Doe" avatar="https://via.placeholder.com/150" online={true} message="Hello"/>
            </div>
            <div className="chat-body">
                <ChatMessage author="John Doe" messages="Hello" />
            </div>
            <div className="chat-footer">
                <ChatInput messages={props.messages || ''} />
            </div>
        </div>
    );
};

export default Chat;
