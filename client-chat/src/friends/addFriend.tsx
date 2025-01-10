import { TextField } from "@mui/material";
import { useState } from "react";
import { Container } from "@mui/material";
import { sendFriendRequest } from "./friendRequest";

const AddFriend = ({ handlerNewFriend }: { handlerNewFriend: any }) => {
    const [friend, setFriend] = useState("");
    const addingNewFriend = async (friend: string) => {
        const newFriend = await sendFriendRequest(friend);
        handlerNewFriend(newFriend);
    }
    return (
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
        </Container>
    )
}

export default AddFriend;