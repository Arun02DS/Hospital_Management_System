import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firtsName:{
        type: String,
        required: true,
        minLength: [3,"First name must conatin at least 3 charaters!"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3,"Last name must conatin at least 3 charaters!"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail,"Please provide a valid email!"]
    },
    Phone:{
        type: String,
        required: true,
        minLength: [10,"Phone number must conatin 10 digits!"],
        maxLength: [10,"Phone number must conatin 10 digits!"]
    },
    message:{
        type: String,
        required: true,
        minLength: [10,"message must conatin at least 10 chararters!"]
    },
})

export const Message = mongoose.model("Message",messageSchema);