import { Box, Container, TableCell, TableHead, TableRow, Table, TableBody, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { getFriendList, removeFriend } from "./friendsAPI";
import AddFriend from "./addFriend";
import { socket } from '../socket/connection';

interface FriendListProps {
  user_id: string;
}

const FriendList: React.FC<any> = ( ) => {

    const [friendsList, setFriendsList] = useState<any>([]);

    const handleRemoveFriend = async (index:number) => {
        const filterFriends = friendsList.filter((friend:any, i:number) => i !== index);
        await removeFriend(friendsList[index]._id);
        setFriendsList(filterFriends);
    }
    const handlerNewFriend = async (newFriend:any) => {
        setFriendsList([...friendsList, newFriend]);
    }
    useEffect(() => {
        const fetchFriends = async () => {
            const fetchedFriends = await getFriendList();
            fetchedFriends.length > 0 ? setFriendsList(fetchedFriends) : setFriendsList([]);
        }
        (async () => await fetchFriends())();
    }, []);

  return (
    <Container sx={{ alignItems: "center", display: "flex", flexDirection: "column", height: "100vh" }} maxWidth='sm'>
      <Box>
      <AddFriend handlerNewFriend={handlerNewFriend} />
        <Table sx={{ width: "100%", mt: "10px" }}>
          <TableBody>
            {friendsList?.map((friend: any, index: number) => (
              <TableRow key={friend._id}>
                <TableCell align="center" sx={{ display: { xs: 'block', md: 'table-cell', alignItems: 'center' } }}>{friend.username}</TableCell>
                <TableCell align="center" sx={{ display: { xs: 'block', md: 'table-cell' } }}>{friend.email}</TableCell>
                <TableCell align="center" sx={{ display: { xs: 'block', md: 'table-cell' } }}>
                  <Button 
                      sx={{ width: "100px", height: "30px", fontSize: "8px" }} 
                      variant="contained" 
                      color="error" 
                      onClick={() => handleRemoveFriend(index)}>Remove Friend</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default FriendList;
