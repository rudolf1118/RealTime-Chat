import React from 'react';

const ChatWith: React.FC<{ username: string, message: string, avatar:any, online:boolean }> = (props) => {
    return <div className="flex items-center gap-2">
        <div className="flex-col">
            <img src={props.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
            <span>{props.online ? 'online' : 'offline'}</span>
        </div>
        <div className="flex-col">
            <span>{props.username}</span>
        </div>
    </div>;
};

export default ChatWith;
