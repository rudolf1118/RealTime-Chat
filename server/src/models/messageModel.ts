import { Schema, model } from 'mongoose';

const Messages = new Schema({
    user_1: {
        id: { type: String, required: true },
        username: { type: String, required: true }
    },
    user_2: {
        id: { type: String, required: true },
        username: { type: String, required: true }
    },
    messages: {
            type: [{
                senderId: {type: String, required: true},
                receiverId: {type: String, required: true},
                text: { type: String, required: true },
                status: { type: String, enum: ['sent', 'delivered', 'seen', 'failed'], default: 'sent' },
                createdAt: { type: Date, default: Date.now }
            }],
            default: []
    },
    timestamp: { type: Date, default: Date.now },
});

export default model('Messages', Messages);