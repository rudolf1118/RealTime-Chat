import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Container } from "@mui/material";
import { sendFriendRequest } from "./friendRequest";
import FriendRequestList from "./friendRequestList";

const AddFriend = ({ handlerNewFriend }: { handlerNewFriend: any }) => {
    const [friend, setFriend] = useState("");
    const addingNewFriend = async (friend: string) => {
        const newFriend = await sendFriendRequest(friend);
        handlerNewFriend(newFriend);
    }
    return (
        <Container sx={{ display: "flex", alignItems: "center", width: "100%"}}>
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
            <Button onClick={() => <FriendRequestList/>} >
                View Friend Requests
            </Button>
        </Container>
    )
}

export default AddFriend;