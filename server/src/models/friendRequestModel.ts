import { Schema, model } from 'mongoose';

const FriendRequest = new Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default model('Friend Requests', FriendRequest);