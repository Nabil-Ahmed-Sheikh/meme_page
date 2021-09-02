import mongoose from 'mongoose'


const connectDB = async (connectionURL: String) => {
    try {
        const conn = await mongoose.connect(`${connectionURL}`);
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB