import { TextField } from "@mui/material";
import { useState } from "react";
import { Container } from "@mui/material";
import { addFriend } from "./friendsAPI";

const AddFriend = ({ handlerNewFriend }: { handlerNewFriend: any }) => {
    const [friendName, setFriendName] = useState("");
    const addingNewFriend = async (friendName: string) => {
        const newFriend = await addFriend(friendName);
        handlerNewFriend(newFriend);
    }
    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
            <TextField
                label="Add Friend"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setFriendName(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addingNewFriend(friendName);
                        setFriendName("");
                    }
                }}
            />
        </Container>
    )
}

export default AddFriend;