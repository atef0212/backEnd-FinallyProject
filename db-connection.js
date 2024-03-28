import mongoose from 'mongoose'
import './config.js'

export async function connectToDatabase(){
    try{
        await mongoose.connect(process.env.UEI)
        console.log("Database connected successfully");

    }catch (error) {
        console.error("Database connection error:", error);
      }
}