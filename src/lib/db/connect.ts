import mongoose from 'mongoose';


const MONGO_URI = process.env.MONGODB_URI || ''

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return
    await mongoose.connect(MONGO_URI)
    
}

export default connectDB