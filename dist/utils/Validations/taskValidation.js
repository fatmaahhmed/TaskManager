"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateTask = exports.validateDeleteTask = exports.validateTaskStatus = exports.validateTask = void 0;
const express_validator_1 = require("express-validator");
const ApiErrorHandler_1 = __importDefault(require("../err/ApiErrorHandler"));
const validatorMiddleware_1 = require("../../middlewares/validation/validatorMiddleware");
exports.validateTask = [
    (0, express_validator_1.body)("title")
        .notEmpty()
        .withMessage("task Title is required")
        .isString()
        .withMessage("task name must be a string"),
    validatorMiddleware_1.validationErrors,
];
exports.validateTaskStatus = [
    (0, express_validator_1.body)("status")
        .notEmpty()
        .withMessage("task status is required")
        .isString()
        .withMessage("task name must be a string")
        .isIn(["incomplete", "complete", "pending"])
        .withMessage("task status must be either complete or incomplete"),
    validatorMiddleware_1.validationErrors,
];
exports.validateDeleteTask = [
    (0, express_validator_1.param)("id").notEmpty().withMessage("task ID is required"),
    validatorMiddleware_1.validationErrors,
];
exports.validateUpdateTask = [
    (0, express_validator_1.body)().custom((value, { req }) => {
        if (Object.keys(req.body).length === 0) {
            throw new ApiErrorHandler_1.default("You must provide: title or status or description at least one", 400);
        }
        return true;
    }),
    (0, express_validator_1.body)("title")
        .optional()
        .isString()
        .withMessage("Category name must be a string"),
    (0, express_validator_1.body)("description")
        .optional()
        .isString()
        .withMessage("Category description must be a string"),
    (0, express_validator_1.body)("status")
        .optional()
        .isString()
        .withMessage("Category status must be a string")
        .isIn(["incomplete", "complete", "pending"])
        .withMessage("Category status must be either complete or incomplete"),
    validatorMiddleware_1.validationErrors,
];
