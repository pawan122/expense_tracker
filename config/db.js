import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
// const MONGO_URL = 'mongodb://localhost:27017/expenses';

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongodb connect successfully')
    } catch (error) {
        console.log('Mongodb connection failed', error)
    }
}

export default connectDb;