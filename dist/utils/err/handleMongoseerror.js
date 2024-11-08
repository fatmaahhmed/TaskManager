"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMongooseError = void 0;
const ApiErrorHandler_1 = __importDefault(require("./ApiErrorHandler"));
const mongoose_1 = require("mongoose");
const handleMongooseError = (error) => {
    console.log("error", error);
    if (error instanceof mongoose_1.Error) {
        if (error instanceof mongoose_1.Error.ValidationError) {
            console.log("Validation error");
            return new ApiErrorHandler_1.default(`Validation error: ${error.message}`, 400);
        }
        if (error instanceof mongoose_1.Error.CastError) {
            console.log("Cast error");
            return new ApiErrorHandler_1.default(`Cast error: ${error.message}`, 400);
        }
        if (error.code === 11000) {
            // Duplicate key error
            console.log("Duplicate key error");
            return new ApiErrorHandler_1.default(`Duplicate key error: ${error.message}`, 409);
        }
        console.log("Mongoose error", error);
        return new ApiErrorHandler_1.default(`Mongoose error: ${error.message}`, 500);
    }
    console.error("An unexpected error occurred", error);
    return new ApiErrorHandler_1.default("An unexpected error occurred", 500);
};
exports.handleMongooseError = handleMongooseError;
