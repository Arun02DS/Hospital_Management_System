import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firtsName: {
        type: String,
        required: true,
        minLength: [3, "First name must conatin at least 3 charaters!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name must conatin at least 3 charaters!"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email!"]
    },
    Phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number must conatin 10 digits!"],
        maxLength: [10, "Phone number must conatin 10 digits!"]
    },
    nic: {
        type: String,
        required: true,
        minLength: [12, "NIC must conatin 12 digits!"],
        maxLength: [12, "NIC must conatin 12 digits!"]
    },
    dob: {
        type: Date,
        required: [true, "DOB is required!"],
    },
    gender: {
        type: String,
        required: [true, "Gender is required!"],
        enum: ["Male", "Female"]
    },
    appointment_date: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    doctor: {
        firtsName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
    },
    hasVisisted: {
        type: Boolean,
        default: false,
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    },
})

export const Appointment = mongoose.model("Appointment",appointmentSchema)