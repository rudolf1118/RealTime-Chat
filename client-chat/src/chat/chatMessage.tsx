import React from 'react';

const ChatMessage: React.FC<{ author: string, messages: string }> = (props) => {
    return <div className= "flex">
        <span>{props.author}</span>
        <span>{props.messages}</span>
    </div>;
};

export default ChatMessage;
