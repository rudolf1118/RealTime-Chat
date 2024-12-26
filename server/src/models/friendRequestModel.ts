import { Schema, model } from 'mongoose';

const FriendRequest = new Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    status: { type: String, required: true },
});

export default model('FriendRequest', FriendRequest);