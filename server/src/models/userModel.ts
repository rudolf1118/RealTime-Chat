import { Schema, model } from 'mongoose';
import { validator } from 'validator';
import bcrypt from "bcrypt";

const Users = new Schema({
    username: {
        type:String,
        required: [true, "Please enter your name"]
    },
    email: {
        type:String,
        required: [true, "Please enter your email"],
        unique: true,
        // validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type:String,
        required: [true, "Please enter your password"],
        minlength: [8, "Password must be at least 8 characters long"]
    },
    profilePicture: {
        type:String,
        default: ""
    },
    friends: {
        type:Array,
        default: []
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

export default model('Users', Users);