"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const ApiErrorHandler_1 = __importDefault(require("../../utils/err/ApiErrorHandler"));
const user_1 = __importDefault(require("../../db/models/user"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.login = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiErrorHandler_1.default("Please provide an email and password", 400);
    }
    // check if user exists
    const user = (await user_1.default.findOne({ email }));
    if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
        throw new ApiErrorHandler_1.default("Invalid email or password", 401);
    }
    req.params.user_id = user._id.toString();
    req.body.email = user.email;
    next();
    res.status(200).json({ message: "Login successful", token: req.token });
});
