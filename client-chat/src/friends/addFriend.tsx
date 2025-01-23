import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Container } from "@mui/material";
import { sendFriendRequest } from "./friendRequestAPI";
import FriendRequestList from "./friendRequestList";

const AddFriend = () => {
    const [friend, setFriend] = useState("");
    const [requestStatus, setRequestStatus] = useState<any | null>(null);
    const addingNewFriend = async (friend: string) => {
        const newFriend:any = await sendFriendRequest(friend);
        setRequestStatus(newFriend);
        console.log(newFriend);
    }
    const [showFriendRequests, setShowFriendRequests] = useState(false);
    return (
        <Container sx={{ display: "flex", alignItems: "center", width: "100%"}}>
            {showFriendRequests ? <FriendRequestList/> : null}
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
                    error={requestStatus && requestStatus.status === 'error'}
                    helperText={requestStatus && requestStatus.status === 'error' ? requestStatus.message : ''}
                />
                {requestStatus && requestStatus.status && (
                    <Typography
                        sx={{
                            color: requestStatus.status === 'error' ? 'red' : 'green',
                            fontSize: "12px",
                            fontWeight: 'semibold',
                            textAlign: 'left',
                        }}
                    >
                        {requestStatus.message}
                    </Typography>
                )}
            </Container>
    
            <Button onClick={() => setShowFriendRequests(true)} >
                View Friend Requests
            </Button>
        </Container>
    )
}

export default AddFriend;