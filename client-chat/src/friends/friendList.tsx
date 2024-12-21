import { Box, Container, TableCell, TableHead, TableRow, Table, TableBody, Button } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { getFriendList } from "./friendsAPI";

// Define the props interface
interface FriendListProps {
  user_id: string;
}

const FriendList: React.FC<FriendListProps> = ({ user_id }) => {

    const [friendsList, setFriendsList] = useState<any>([]);

    const handleRemoveFriend = (index:number) => {
        console.log("Friend was removed");
        const filterFriends = friendsList.filter((friend:any, i:number) => i !== index);
        console.log(filterFriends);
        setFriendsList(filterFriends);
    }

    useEffect(() => {
        const fetchFriends = async () => {
            console.log("user_id", user_id);    
            const fetchedFriends = await getFriendList(user_id);
            console.log("fetchedFriends", fetchedFriends);
            fetchedFriends ? setFriendsList(fetchedFriends.friends) : setFriendsList([]);
        }
        fetchFriends();
    }, []);

  return (
    <Container>
      <Box>
        <Table>
          <TableBody>
            {friendsList?.map((friend:any, index) => (
              <TableRow key={index}>
                <TableCell>{friend?.username}</TableCell>
                <TableCell>{friend?.email}</TableCell>
                <TableCell>
                    <Button 
                        sx= {{ width:"100px", height:"30px", fontSize:"8px", padding:0 }} 
                        variant="contained" 
                        color="error" 
                        onClick = {() => handleRemoveFriend(index)}>Remove Friend</Button>
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
