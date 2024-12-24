import { Box, Container, TableCell, TableHead, TableRow, Table, TableBody, Button } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { getFriendList } from "./friendsAPI";

// Define the props interface
interface FriendListProps {
  user_id: string;
}

const FriendList: React.FC<any> = ( ) => {

    const [friendsList, setFriendsList] = useState<any>([]);

    const handleRemoveFriend = (index:number) => {
        console.log("Friend was removed");
        const filterFriends = friendsList.filter((friend:any, i:number) => i !== index);
        console.log(filterFriends);
        setFriendsList(filterFriends);
    }

    useEffect(() => {
        const fetchFriends = async () => {
            const fetchedFriends = await getFriendList();
            console.log("fetchedFriends", fetchedFriends);
            fetchedFriends ? setFriendsList(fetchedFriends) : setFriendsList([]);
        }
        (async () => await fetchFriends())();
    }, []);

  return (
    <Container>
      <Box>
        <Table>
          <TableBody>
            {friendsList.map((friend: any, index: number) => (
              <TableRow key={index}>
                <TableCell align="center">{friend.username}</TableCell>
                <TableCell align="center">{friend.email}</TableCell>
                <TableCell align="center">
                    <Button 
                        sx={{ width: "100px", height: "30px", fontSize: "8px", marginTop: "10px" }} 
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
