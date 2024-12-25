import { useEffect, useState } from "react";
import { getFriendList } from "../friends/friendsAPI";
import { Box, Container, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import ProfileIcon from "./profileIcon";

const ChatList = () => {
    const [friendsList, setFriendsList] = useState([]);

    useEffect(() => {
        const fetchFriends: any = async () => {
            const friends: any[] = await getFriendList();
            friends ? setFriendsList(friends) : setFriendsList([]);
        };
        (async () => await fetchFriends())();
    }, []);

    return (
      <Box  sx={{ marginLeft: "100px", marginTop: "0px", display: "flex", height: "100vh" }}>
            <Table>
                <TableBody>
                    <Typography variant="h4" sx={{ marginBottom: "15px", marginTop: "0px" }}>Chats</Typography>
                    <hr style={{ border: "0.7px solid gray", margin: "10px 0", width: "100%" }} /> 
                    {friendsList.map((friend: any) => (
                <TableRow key={friend.id} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <ProfileIcon username={friend.username} online={true} />
                        <Typography variant="h6">{friend.username}</Typography>
                        <Typography sx={{ cursor: "pointer", color: "gray", fontSize: "12px" }}>Click to chat...</Typography>
                        <Box sx={{ borderBottom: "0.5px solid gray", margin: "10px 0", width: "100%" }} /> 
                </TableRow>
            ))}
            </TableBody>
            </Table>
      </Box>
    )
}

export default ChatList; 