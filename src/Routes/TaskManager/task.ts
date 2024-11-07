import {
  createTask,
  deleteTask,
  filterTasks,
  getAllTasks,
  updateTask,
} from "../../controller/tasks/tasks";
import {
  validateDeleteTask,
  validateTask,
  validateTaskStatus,
  validateUpdateTask,
} from "../../utils/Validations/taskValidation";

import { Router } from "express";
import { isAuthenticated } from "../../middlewares/auth/verifyTokenWithOptionalRole";

export const TaskManagerRoutes = Router();

TaskManagerRoutes.get("/", isAuthenticated(), getAllTasks);
TaskManagerRoutes.get(
  "/status",
  isAuthenticated(),
  validateTaskStatus,
  filterTasks
);
TaskManagerRoutes.post("/", validateTask, isAuthenticated(), createTask);
TaskManagerRoutes.put(
  "/:id",
  isAuthenticated(),
  validateUpdateTask,
  updateTask
);
TaskManagerRoutes.delete(
  "/:id",
  isAuthenticated(),
  validateDeleteTask,
  deleteTask
);
