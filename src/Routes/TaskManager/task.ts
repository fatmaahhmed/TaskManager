import {
  createTask,
  deleteTask,
  filterTasks,
  getAllTasks,
  updateTask,
} from "../../controller/tasks/tasks";

import { Router } from "express";
import { isAuthenticated } from "../../middlewares/auth/verifyTokenWithOptionalRole";

export const TaskManagerRoutes = Router();

TaskManagerRoutes.get("/", isAuthenticated(), getAllTasks);
TaskManagerRoutes.get("/status", isAuthenticated(), filterTasks);
TaskManagerRoutes.post("/", isAuthenticated(), createTask);
TaskManagerRoutes.put("/:id", isAuthenticated(), updateTask);
TaskManagerRoutes.delete("/:id", isAuthenticated(), deleteTask);
