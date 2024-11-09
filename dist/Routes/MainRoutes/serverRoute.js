"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRoutes = void 0;
const ApiErrorHandler_1 = __importDefault(require("../../utils/err/ApiErrorHandler"));
const task_1 = require("../TaskManager/task");
const GlobalErrorHandlerMiddleware_1 = require("../../middlewares/Err/GlobalErrorHandlerMiddleware");
const verifyTokenWithOptionalRole_1 = require("../../middlewares/auth/verifyTokenWithOptionalRole");
const _2_login_1 = require("../Auth/2-login");
const _1_signup_1 = require("../Auth/1-signup");
// Function to apply auth routes
const applyAuthRoutes = (app) => {
    app.use("/auth/signup", _1_signup_1.signupRouter);
    app.use("/auth/login", _2_login_1.loginRouter);
};
// Function to apply routes
const applyApiRoute = (app) => {
    app.use("/api/task", task_1.TaskManagerRoutes);
};
const applyRoutes = (app) => {
    app.get("/", (req, res) => {
        res.send("MAIN ROUTE : Welcome to Task Manager API home page,hello from docker now we are in sync docker and gitt");
    });
    app.get("/test", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), (req, res) => {
        res.send("Middleware with parameter executed!");
    });
    // Apply auth routes
    applyAuthRoutes(app);
    applyApiRoute(app);
    // applyRoutes(app);
    app.all("*", (req, res, next) => {
        const message = `Resource not found : ${req.originalUrl}`;
        next(new ApiErrorHandler_1.default(message, 400));
    });
    app.use(GlobalErrorHandlerMiddleware_1.globalError);
};
exports.applyRoutes = applyRoutes;
