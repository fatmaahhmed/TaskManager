import dotenv from "dotenv";
import mongoose from "mongoose";
// load environment variables

dotenv.config();

const mongoUri =
  process.env.MONGO_URI ||
  "mongodb+srv://TaskManager:Admin%40123@taskmanager.k1wuj.mongodb.net/TaskManager?retryWrites=true&w=majority";
if (!mongoUri) {
  throw new Error("MONGO_URI environment variable is not defined");
}

export const dbConnection = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};
