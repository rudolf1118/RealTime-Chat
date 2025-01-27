import { Routes, Route, useLocation } from "react-router-dom";
import FriendList from "../../friends/friendList";
import SideBar from "./sidebar";
import ProtectedRoute from "../../auth/authProtected";
import { getFriendList } from "../../friends/friendsAPI";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ChatList from "../../chat/chatList";
import Chat from "../../chat/chatService";
import FriendRequestList from "../../friends/friendRequestList";
interface FriendListProps {
    friends: any[]; // Define the type of friends as needed
}
const Side:React.FC<any> = (props: any) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const chatId = queryParams.get('id');

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', margin: '0' }}>
                <SideBar />
                <Routes>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="friends" element={<FriendList/>}/>
                        <Route path="friends/requests" element={<FriendRequestList/>}/>
                        <Route path="chats" element={chatId ? <Chat /> : <ChatList />} />
                    </Route>
                </Routes>
            </Box>
        </>
    );
};

export default Side;



