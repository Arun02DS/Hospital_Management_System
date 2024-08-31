import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
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
    nic:{
        type: String,
        required: true,
        minLength: [12,"NIC must conatin 12 digits!"],
        maxLength: [12,"NIC must conatin 12 digits!"]
    },
    dob:{
        type: Date,
        required: [true,"DOB is required!"],
    },
    gender:{
        type: String,
        required: [true,"Gender is required!"],
        enum: ["Male","Female"]
    },
    password:{
        type: String,
        required: true,
        minLength: [8,"Password must have at least 8 characters!"],
        select: false
    },
    role:{
        type: String,
        required: true,
        enum: ["Admin","Patient","Doctor"]
    },
    doctorDepartement:{
        type: String,
    },
    docAvatar:{
        public_id: String,
        url: String
    },
    
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,
        {expiresIn: process.env.JWT_EXPIRES }
    )
}

export const User = mongoose.model("User",userSchema);