import { useEffect, useState } from "react";
import { getFriendList } from "../friends/friendsAPI";
import { Box, Container, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import ProfileIcon from "./profileIcon";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
    const [friendsList, setFriendsList] = useState([]);
    const navigate = useNavigate();
    const handleChat = (friend: any) => {
        navigate(`/main/chats?id=${btoa(friend._id)}`);
    }

    useEffect(() => {
        const fetchFriends: any = async () => {
            const friends: any[] = await getFriendList();
            friends.length > 0 ? setFriendsList(friends) : setFriendsList([]);
        };
        (async () => await fetchFriends())();
    }, []);

    return (
      <Box  sx={{ marginLeft: "80px", marginTop: "0px", display: "flex", height: "100vh", borderLeft: "0.7px solid gray", borderRight: "1px solid gray", py: "10px" }}>
            <Table>
                <TableBody>
                    <Typography variant="h4" sx={{ marginBottom: "15px", marginLeft: "10px", marginTop: "0px" }}>Chats</Typography>
                    <hr style={{ border: "0.7px solid gray", margin: "10px 0", width: "100%" }} /> 
                    {friendsList?.map((friend: any) => (
                <TableRow key={friend._id} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <Typography variant="h6" sx={{ marginLeft: "10px" }}> <ProfileIcon username={friend.username} online={true} /> </Typography>
                        <Typography variant="h6" sx={{ marginLeft: "10px" }}>{friend.username}</Typography>
                        <Typography sx={{ cursor: "pointer", color: "gray", fontSize: "12px", marginLeft: "10px" }} onClick={() => {
                            handleChat(friend);
                        }}>Click to chat...</Typography>
                        <Box sx={{ borderBottom: "0.5px solid gray", margin: "10px 0", width: "100%" }}/> 
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
      </Box>
    )
}

export default ChatList; 