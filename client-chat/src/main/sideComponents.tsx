import { Routes, Route } from "react-router-dom";
import FriendList from "../friends/friendList";
import SideBar from "./sidebar";
import ProtectedRoute from "../auth/authProtected";
import { getFriendList } from "../friends/friendsAPI";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
interface FriendListProps {
    friends: any[]; // Define the type of friends as needed
}
const Side:React.FC<any> = (props: any) => {
    console.log(props.user_id);
    return (
        <>
        <ProtectedRoute>
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <SideBar />
                <Routes>
                    <Route path="friends" element={<FriendList user_id={props.user_id} />} />
                </Routes>
            </Box>
        </ProtectedRoute>
        </>
    );
};

export default Side;



