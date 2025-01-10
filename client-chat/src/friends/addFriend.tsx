import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Container } from "@mui/material";
import { sendFriendRequest } from "./friendRequest";
import FriendRequestList from "./friendRequestList";

const AddFriend = () => {
    const [friend, setFriend] = useState("");
    const [requestStatus, setRequestStatus] = useState<any | null>(null);
    const addingNewFriend = async (friend: string) => {
        const newFriend:any = await sendFriendRequest(friend);
        setRequestStatus(newFriend);
        console.log(newFriend);
    }
    return (
        <Container sx={{ display: "flex", alignItems: "center", width: "100%"}}>
            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
                <TextField
                    label="Add Friend"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setFriend(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            addingNewFriend(friend);
                            setFriend("");
                        }
                    }}
                />
                {requestStatus && requestStatus.status && (
                    <Typography
                        sx={{
                            color: requestStatus.status === 'error' ? 'red' : 'green',
                            fontWeight: 'bold',
                            mt: 2
                        }}
                    >
                        {requestStatus.message}
                    </Typography>
                )}
            </Container>
    
            <Button onClick={() => <FriendRequestList/>} >
                View Friend Requests
            </Button>
        </Container>
    )
}

export default AddFriend;