import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export async function dbConnection() {
  try {
    const mongoUri =
      process.env.MONGO_URI ||
      "mongodb+srv://TaskManager:Admin%40123@taskmanager.k1wuj.mongodb.net/TaskManager?retryWrites=true&w=majority";
    console.log("mongoUri-->", mongoUri);

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(mongoUri);
    console.log("Database connection successfully established");
  } catch (error) {
    console.error(`Failed to connect to the database: ${error}`);
    process.exit(1); // Exit the process with failure
  }
}