import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connection to MONGODB succesful, connection: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Connection to MONGODB unsuccesful, error: ${error}`);
    }
};