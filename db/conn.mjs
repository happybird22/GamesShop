import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectionStr = process.env.mongoURI || '';

async function connectionStr () {
    try {
        await mongoose.connect(connectionStr)
    } catch (err) {
        console.log(err)
    }
}

export default connectDB