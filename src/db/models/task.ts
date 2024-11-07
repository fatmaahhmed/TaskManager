import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  title: string;
  description?: string;
  status: "completed" | "incomplete";
  userId: mongoose.Schema.Types.ObjectId;
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
    },
    status: {
      type: String,
      enum: ["completed", "incomplete"],
      default: "incomplete",
    },
    userId: {
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
