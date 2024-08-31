import { syncIndexes } from "mongoose";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import errorHandler from "../middlewares/errorMiddleware.js";
import ErrorHandler from "../middlewares/errorMiddleware.js"
import { User } from "../models/userSchema.js"
import { generateToken } from "../utils/jwtToken.js"
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firtsName,
        lastName,
        email,
        Phone,
        nic,
        dob,
        gender,
        password,
        role,
    } = req.body;
    if (
        !firtsName ||
        !lastName ||
        !email ||
        !Phone ||
        !nic ||
        !dob ||
        !gender ||
        !password ||
        !role) {
        return next(new ErrorHandler("Please fill full form!", 400))
    }
    let user = await User.findOne({ email })
    if (user) {
        return next(new ErrorHandler("User already registered!", 400))
    }
    user = await User.create({
        firtsName,
        lastName,
        email,
        Phone,
        nic,
        dob,
        gender,
        password,
        role,
    })

    generateToken(user, "User registered !", 200, res);

})


export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new errorHandler("Details are missing, Please check!", 400))
    }
    if (password !== confirmPassword) {
        return next(new errorHandler("Wrong password, Try again !", 400))
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new errorHandler("_Invalid Email or Password!", 400))
    }
    const isPasswordMacthed = await user.comparePassword(password);
    if (!isPasswordMacthed) {
        return next(new errorHandler("_Invalid Email or Password!", 400))
    }
    if (role !== user.role) {
        return next(new errorHandler("User with this role not found", 400))
    }

    generateToken(user, "User Logged In successfully!", 200, res);
})

export const addnewAdmin = catchAsyncErrors(async (req, res, next) => {

    const {
        firtsName,
        lastName,
        email,
        Phone,
        nic,
        dob,
        gender,
        password,
    } = req.body;
    if (
        !firtsName ||
        !lastName ||
        !email ||
        !Phone ||
        !nic ||
        !dob ||
        !gender ||
        !password
    ) {
        return next(new ErrorHandler("Please fill full form!", 400))
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new errorHandler(`${isRegistered.role} with this email already exist!`));
    }

    const admin = await User.create({
        firtsName,
        lastName,
        email,
        Phone,
        nic,
        dob,
        gender,
        password,
        role: "Admin",
    })

    res.status(200).json({
        success: true,
        message: "New User with Admin role Registered!"
    })
})

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" })
    res.status(200).json({
        success: true,
        doctors,
    })
})

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    })
})

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res
        .status(200)
        .cookie("adminToken", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .json({
            success: true,
            message: "User Admin logged out successfully!"
        })
})

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res
        .status(200)
        .cookie("patientToken", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .json({
            success: true,
            message: "User Patient logged out successfully!"
        })
})

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new errorHandler("Doctor Avatar Required!", 400))
    }

    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new errorHandler("File format not supported!", 400))
    }

    const {
        firtsName,
        lastName,
        email,
        Phone,
        nic,
        dob,
        gender,
        password,
        doctorDepartement,
    } = req.body;

    if (!firtsName ||
        !lastName ||
        !email ||
        !Phone ||
        !nic ||
        !dob ||
        !gender ||
        !password ||
        !doctorDepartement) {
        return next(new errorHandler("Please provide the required information!", 400))
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new errorHandler(`${isRegistered.role} is already registered with this email!`, 400))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error){
        console.error("cloudinary error:" , cloudinaryResponse.error || "Unknown cloudinary error")
        return next(
            new errorHandler("Failed to upload doctor avatar in Cloudinary",500)
        )
    }

    const doctor = await User.create({
        firtsName,
        lastName,
        email,
        Phone,
        nic,
        dob,
        gender,
        password,
        doctorDepartement,
        role: "Doctor",
        docAvatar:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    })
    res.status(200).json({
        success: true,
        message: "New Doctor registered!",
        doctor
    })
})

