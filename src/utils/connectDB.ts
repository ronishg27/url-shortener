import mongoose from "mongoose";
import { DB_NAME } from "@/utils/constants";

const connectDB = async () => {
  // Check if already connected to avoid multiple connections in development
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    // Create connection instance
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
    );

    console.log(
      `MongoDB connected! DB HOST: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
