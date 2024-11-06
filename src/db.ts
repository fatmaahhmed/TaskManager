import dotenv from "dotenv";
import mongoose from "mongoose";

// load environment variables
dotenv.config();
// database connect
export async function dbConnection() {
  try {
    const mongoUri = process.env.MONGO_URI;
    console.log(mongoUri);
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(mongoUri);
    console.log("database connection successfully");
  } catch (error: unknown) {
    console.log(`failed to connect database ${error}`);
  }
}
