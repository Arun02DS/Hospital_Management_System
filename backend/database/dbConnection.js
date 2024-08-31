import mongoose from "mongoose";


// Connecting to database
export const dbconnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"MANAGEMENT"
    }).then(()=>{
        console.log("connected to database")
    }).catch(err => {
        console.log(`Error while connecting to database with error: ${err}`)
    })

}