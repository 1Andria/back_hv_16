import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Connected successfully");
  } catch (e) {
    console.log("Could not connect to Db");
  }
};
