import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  title: string;
  description?: string;
  status: "completed" | "incomplete" | "pending";
  user_id: mongoose.Schema.Types.ObjectId;
}

const taskSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["completed", "incomplete", "pending"],
      default: "incomplete",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
