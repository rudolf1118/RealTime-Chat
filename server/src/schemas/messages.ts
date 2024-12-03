import { Schema, model } from 'mongoose';

const Messages = new Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export default model('Messages', Messages);