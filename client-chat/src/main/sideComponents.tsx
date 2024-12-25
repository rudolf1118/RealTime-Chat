import { Routes, Route } from "react-router-dom";
import FriendList from "../friends/friendList";
import SideBar from "./sidebar";
import ProtectedRoute from "../auth/authProtected";
import { getFriendList } from "../friends/friendsAPI";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ChatList from "../chat/chatList";
interface FriendListProps {
    friends: any[]; // Define the type of friends as needed
}
const Side:React.FC<any> = (props: any) => {
    console.log("THIS IS USER_ID",props.user_id);
    return (
        <>
        <ProtectedRoute>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', margin: '0' }}>
                <SideBar />
                <Routes>
                    <Route path="friends" element={<FriendList/>} />
                    <Route path="chats" element={<ProtectedRoute><ChatList /></ProtectedRoute>} />
                </Routes>
            </Box>
        </ProtectedRoute>
        </>
    );
};

export default Side;



