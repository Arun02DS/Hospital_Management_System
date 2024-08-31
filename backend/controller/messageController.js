import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import {Message} from "../models/messageSchema.js"
import errorHandler from "../middlewares/errorMiddleware.js"

export const sendMessage = catchAsyncErrors(async (req,res,next) => {
    const { firtsName, lastName, email, Phone, message } = req.body;
    if(!firtsName || !lastName || !email || !Phone || !message) {
        return next(new errorHandler("Please fill the full form",400))
    }
    await Message.create({ firtsName, lastName, email, Phone, message });
    res.status(200).json({
        success: true,
        message: "Message send successfully!"
    });
})

export const getAllMesages = catchAsyncErrors(async(req,res,next) => {
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages,
    })
})
