import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Container } from "@mui/material";
import { sendFriendRequest } from "./friendRequestAPI";
import FriendRequestList from "./friendRequestList";
import { useNavigate } from "react-router-dom";
const AddFriend = () => {
    const [friend, setFriend] = useState("");
    const navigate = useNavigate();
    const [requestStatus, setRequestStatus] = useState<any | null>(null);
    const addingNewFriend = async (friend: string) => {
        console.log(friend);
        const newFriend:any = await sendFriendRequest(friend);
        setRequestStatus(newFriend);
        console.log(newFriend);
    }
    
    const showRequestList = () => {
        navigate('requests');
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
    
            <Button onClick={(showRequestList)} >
                View Friend Requests
            </Button>
        </Container>
    )
}

export default AddFriend;