import { Schema, model } from 'mongoose';

const Messages = new Schema({
    sender: { 
        id: { type: String, required: true },
        username: { type: String, required: true }
    },
    receiver: { 
        id: { type: String, required: true },
        username: { type: String, required: true }
    },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export default model('Messages', Messages);