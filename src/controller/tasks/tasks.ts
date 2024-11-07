import { NextFunction, Request, Response } from "express";

import ApiError from "../../utils/err/ApiErrorHandler";
import { ExtendedRequest } from "../../utils/Types/request/request";
import Task from "../../db/models/task";
import asyncHandler from "express-async-handler";
import { body } from "express-validator/lib/middlewares/validation-chain-builders";
import mongoose from "mongoose";

// create a new task
export const createTask = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    let { title, description, status } = req.body;
    if (!status) {
      status = "incomplete";
    }
    const user_id = req.params.user_id;
    const task = new Task({ title, description, user_id, status });
    await task
      .save()
      .then((task) => {
        console.log(task);
      })
      .catch((err) => {
        console.log(err);
      });
    const message = `Task added successfully`;
    console.log(req.token);
    res.status(201).json({ message, task, token: req.token });
  }
);
// get all tasks for a user
export const getAllTasks = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const user_id = req.params.user_id;
    const tasks = await Task.find({ user_id });
    console.log(tasks);
    res.status(200).json({ tasks });
  }
);
// filter tasks by status
export const filterTasks = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const user_id = req.params.user_id;
    const status = req.body.status;
    const tasks = await Task.find({ user_id, status });
    console.log(tasks);
    res.status(200).json({ tasks });
  }
);
// update a task
export const updateTask = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const user_id = req.params.user_id;
    const task_id = req.params.id;
    const { title, description, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { user_id, _id: task_id },
      { title, description, status },
      { new: true }
    );
    console.log(task);
    res.status(200).json({ task });
  }
);
// delete a task
export const deleteTask = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const user_id = req.params.user_id;
    const task_id = req.params.id;
    // Validate the task_id

    // Find the task
    let task = await Task.findOne({ user_id, _id: task_id });
    console.log(task);
    if (!task) {
      throw new ApiError("Task not found", 404);
    }
    task = await Task.findOneAndDelete({ user_id, _id: task_id });
    console.log(task);
    res.status(200).json({ message: "Task deleted successfully" });
  }
);
