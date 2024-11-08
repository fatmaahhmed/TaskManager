"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.filterTasks = exports.getAllTasks = exports.createTask = void 0;
const ApiErrorHandler_1 = __importDefault(require("../../utils/err/ApiErrorHandler"));
const task_1 = __importDefault(require("../../db/models/task"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// create a new task
exports.createTask = (0, express_async_handler_1.default)(async (req, res, next) => {
    let { title, description, status } = req.body;
    if (!status) {
        status = "incomplete";
    }
    const user_id = req.params.user_id;
    const task = new task_1.default({ title, description, user_id, status });
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
});
// get all tasks for a user
exports.getAllTasks = (0, express_async_handler_1.default)(async (req, res, next) => {
    const user_id = req.params.user_id;
    const tasks = await task_1.default.find({ user_id });
    console.log(tasks);
    res.status(200).json({ tasks });
});
// filter tasks by status
exports.filterTasks = (0, express_async_handler_1.default)(async (req, res, next) => {
    const user_id = req.params.user_id;
    const status = req.body.status;
    const tasks = await task_1.default.find({ user_id, status });
    console.log(tasks);
    res.status(200).json({ tasks });
});
// update a task
exports.updateTask = (0, express_async_handler_1.default)(async (req, res, next) => {
    const user_id = req.params.user_id;
    const task_id = req.params.id;
    const { title, description, status } = req.body;
    const task = await task_1.default.findOneAndUpdate({ user_id, _id: task_id }, { title, description, status }, { new: true });
    console.log(task);
    res.status(200).json({ task });
});
// delete a task
exports.deleteTask = (0, express_async_handler_1.default)(async (req, res, next) => {
    const user_id = req.params.user_id;
    const task_id = req.params.id;
    // Validate the task_id
    // Find the task
    let task = await task_1.default.findOne({ user_id, _id: task_id });
    console.log(task);
    if (!task) {
        throw new ApiErrorHandler_1.default("Task not found", 404);
    }
    task = await task_1.default.findOneAndDelete({ user_id, _id: task_id });
    console.log(task);
    res.status(200).json({ message: "Task deleted successfully" });
});
