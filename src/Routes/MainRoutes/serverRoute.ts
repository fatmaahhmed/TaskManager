import ApiError from "../../utils/err/ApiErrorHandler";
import { TaskManagerRoutes } from "../TaskManager/task";
import express from "express";
import { globalError } from "../../middlewares/Err/GlobalErrorHandlerMiddleware";
import { isAuthenticated } from "../../middlewares/auth/verifyTokenWithOptionalRole";
import { loginRouter } from "../Auth/2-login";
import { signupRouter } from "../Auth/1-signup";
// Function to apply auth routes
const applyAuthRoutes = (app: express.Application) => {
  app.use("/auth/signup", signupRouter);
  app.use("/auth/login", loginRouter);
};
// Function to apply routes
const applyApiRoute = (app: express.Application) => {
  app.use("/api/task", TaskManagerRoutes);
};

export const applyRoutes = (app: express.Application) => {
  app.get("/", (req, res) => {
    res.send(
      "MAIN ROUTE : Welcome to Task Manager API home page from development branch"
    );
  });
  app.get("/test", isAuthenticated(), (req, res) => {
    res.send("Middleware with parameter executed!");
  });

  // Apply auth routes
  applyAuthRoutes(app);

  applyApiRoute(app);
  // applyRoutes(app);

  app.all("*", (req, res, next) => {
    const message = `Resource not found : ${req.originalUrl}`;
    next(new ApiError(message, 400));
  });

  app.use(globalError);
};
