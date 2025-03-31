import mongoose from "mongoose";

const MONGO_URL = 'mongodb://localhost:27017/expenses';

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Mongodb connect successfully')
    } catch (error) {
        console.log('Mongodb connection failed', error)
    }
}

export default connectDb;