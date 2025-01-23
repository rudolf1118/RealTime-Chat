import { Box, Container, TableCell, TableHead, TableRow, Table, TableBody, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { getFriendList, removeFriend } from "./friendsAPI";
import AddFriend from "./addFriend";
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
    useEffect(() => {
        const fetchFriends = async () => {
            const fetchedFriends = await getFriendList();
            console.log(fetchedFriends);
            
            fetchedFriends.length > 0 ? setFriendsList(fetchedFriends) : setFriendsList([]);
        }
        (async () => await fetchFriends())();
    }, []);

  return (
    <Box sx={{ alignItems: "center", display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box>
      <AddFriend />
        <Table sx={{ width: "100%", mt: "10px" }}>
          <TableBody>
            {friendsList?.map((friend: any, index: number) => (
              <TableRow key={friend?._id || "1"} hover sx={{ display: { xs: 'block', md: 'table-row' } }}>
                <TableCell 
                  align="center" 
                  sx={{ 
                    display: { xs: 'flex', md: 'table-cell' },
                    justifyContent: 'center',
                    padding: { xs: '8px', md: '16px' },
                    borderBottom: { xs: 'none', md: '1px solid rgba(224, 224, 224, 1)' }
                  }}
                >
                  {friend?.username}
                </TableCell>
                <TableCell 
                  align="center"
                  sx={{
                    display: { xs: 'flex', md: 'table-cell' },
                    justifyContent: 'center', 
                    padding: { xs: '8px', md: '16px' },
                    borderBottom: { xs: 'none', md: '1px solid rgba(224, 224, 224, 1)' }
                  }}
                >
                  {friend?.email}
                </TableCell>
                <TableCell 
                  align="center"
                  sx={{
                    display: { xs: 'flex', md: 'table-cell' },
                    justifyContent: 'center',
                    padding: { xs: '8px', md: '16px' },
                    borderBottom: { xs: '1px solid rgba(224, 224, 224, 1)', md: '1px solid rgba(224, 224, 224, 1)' },
                    marginBottom: { xs: '8px', md: 0 }
                  }}
                >
                  <Button
                    sx={{ 
                      minWidth: { xs: '80%', md: '120px' },
                      fontSize: '0.75rem',
                      padding: '6px 16px'
                    }}
                    variant="contained"
                    color="error"
                    size="small" 
                    onClick={() => handleRemoveFriend(index)}
                  >
                    Remove Friend
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default FriendList;
