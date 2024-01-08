import mongoose from 'mongoose';
const url = process.env.MONGO_URL;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${url}`);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;