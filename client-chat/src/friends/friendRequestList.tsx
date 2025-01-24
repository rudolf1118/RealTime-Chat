import { Button, Container, TableCell, TableRow, Table, TableBody, Typography, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getFriendRequests } from "./friendRequestAPI";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const FriendRequestList = () => {
    const [requestsList, setRequestsList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            dayjs.extend(relativeTime);
            try {
                const requests:any[] = await getFriendRequests();
                console.log("requests", requests);
                setRequestsList(requests || []);
            } catch (error) {
                console.error("Error fetching requests:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchFriendRequests();
    }, []);

    const handleAcceptFriendRequest = async (friendId: string) => {
        // await acceptFriendRequest(friendId);
    }

    const handleRejectFriendRequest = async (friendId: string) => {
        // await rejectFriendRequest(friendId);
    }

    return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%", marginLeft: "auto", marginRight: "auto", justifyContent: "center" }}>
        <Table sx={{ width: "100%", mt: "10px", align: "center", display:"flex", flexDirection:"column", alignItems:"center"}}>
          <TableBody>
            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", p: 3}}>
                <CircularProgress />
              </Box>
            ) : requestsList?.length === 0 ? (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
                    <Typography>No friend requests found</Typography>
              </Box>
            ) : (
              requestsList.map((friend: any, index: number) => (
                <TableRow key={friend._id}>
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
                    {friend.email}
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
                    {dayjs(friend.timestamp).fromNow()}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: { xs: 'flex', md: 'table-cell' },
                      justifyContent: 'center',
                      padding: { xs: '8px', md: '16px' },
                      borderBottom: { xs: '1px solid rgba(224, 224, 224, 1)', md: '1px solid rgba(224, 224, 224, 1)' }
                      
                    }}
                  >
                    <Button
                      sx={{ width: "100px", height: "30px", fontSize: "1.4vh" }}
                      variant="contained"
                      onClick={() => handleAcceptFriendRequest(friend._id)}
                    >
                        Accept
                    </Button>
                    <Button 
                        sx={{ width: "100px", height: "30px", fontSize: "1.4vh", marginLeft: "10px" }}
                        variant="contained"
                        color="error"
                        onClick={() => handleRejectFriendRequest(friend._id)}
                        >
                        Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
     </Box>
    )
}

export default FriendRequestList;