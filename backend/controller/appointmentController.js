import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import errorHandler from "../middlewares/errorMiddleware.js"
import {Appointment} from "../models/appointmentSchema.js"
import {User} from "../models/userSchema.js"

export const postAppointment = catchAsyncErrors(async(req,res,next) => {
    const {

        firtsName,
        lastName,
        email,
        Phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisisted,
        address,

    } = req.body;

    if(
        !firtsName ||
        !lastName ||
        !email ||
        !Phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor_firstName ||
        !doctor_lastName ||
        !address 
    ){
        return next(new errorHandler(" Please fill Full form!",400))
    }

    const isConflict = await User.find({
        firtsName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartement : department
    })
    if(isConflict.length === 0){
        return next(new errorHandler("Doctor not found",400))
    }
    if(isConflict.length > 1){
        return next(new errorHandler("Doctor conflict, Please contact via email or phone",400))
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({
        firtsName,
        lastName,
        email,
        Phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor:{
            firtsName:doctor_firstName,
            lastName:doctor_lastName,
        },
        hasVisisted,
        address,
        doctorId,
        patientId
    })
    res.status(200).json({
        success:true,
        message:"Appointment sent sucessfully!",
        appointment,
    })
})

export const getAllAppointments = catchAsyncErrors(async(req,res,next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments
    })
})

export const updateAppointmentStatus = catchAsyncErrors(async(req,res,next) => {
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new errorHandler("Appointment not found",404))
    }

    appointment = await Appointment.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        status: true,
        message: "Appointment Status Updated!",
        appointment,
    })
})

export const deleteAppointment = catchAsyncErrors(async (req,res,next) => {
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new errorHandler("Appointment not found",404))
    }

    await appointment.deleteOne();
    res.status(200).json({
        success:true,
        message:"Appointment deteted!"
    })
})