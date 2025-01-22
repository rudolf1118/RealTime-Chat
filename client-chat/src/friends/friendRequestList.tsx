import { Button, Container, TableCell, TableRow, Table, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import { getFriendRequests } from "./friendRequestAPI";

const FriendRequestList = () => {
    const [requestsList, setRequestsList] = useState<any[]>([]);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            const requests:any[] = await getFriendRequests();
            setRequestsList(requests || []);
        }
        fetchFriendRequests();
    }, []);

    return (
    <Container sx={{ display: "flex", alignItems: "center", width: "100%"}}>
        <Table sx={{ width: "100%", mt: "10px" }}>
          <TableBody>
            {requestsList?.map((friend: any, index: number) => (
              <TableRow key={friend._id}>
                <TableCell align="center" sx={{ display: { xs: 'block', md: 'table-cell', alignItems: 'center' } }}>{friend?.username}</TableCell>
                <TableCell align="center" sx={{ display: { xs: 'block', md: 'table-cell' } }}>{friend.email}</TableCell>
                <TableCell align="center" sx={{ display: { xs: 'block', md: 'table-cell' } }}>
                  <Button 
                      sx={{ width: "100px", height: "30px", fontSize: "8px" }} 
                      variant="contained"  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
     </Container>
    )
}

export default FriendRequestList;