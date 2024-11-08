"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManagerRoutes = void 0;
const tasks_1 = require("../../controller/tasks/tasks");
const taskValidation_1 = require("../../utils/Validations/taskValidation");
const express_1 = require("express");
const verifyTokenWithOptionalRole_1 = require("../../middlewares/auth/verifyTokenWithOptionalRole");
exports.TaskManagerRoutes = (0, express_1.Router)();
exports.TaskManagerRoutes.get("/", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), tasks_1.getAllTasks);
exports.TaskManagerRoutes.get("/status", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), taskValidation_1.validateTaskStatus, tasks_1.filterTasks);
exports.TaskManagerRoutes.post("/", taskValidation_1.validateTask, (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), tasks_1.createTask);
exports.TaskManagerRoutes.put("/:id", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), taskValidation_1.validateUpdateTask, tasks_1.updateTask);
exports.TaskManagerRoutes.delete("/:id", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), taskValidation_1.validateDeleteTask, tasks_1.deleteTask);