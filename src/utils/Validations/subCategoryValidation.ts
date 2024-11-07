import { body, param } from "express-validator";

import ApiError from "../err/ApiErrorHandler";
import { validationErrors } from "../../middlewares/validation/validatorMiddleware";

export const validateTask = [
  body("title")
    .notEmpty()
    .withMessage("task Title is required")
    .isString()
    .withMessage("task name must be a string"),
  param("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt()
    .withMessage("User ID must be an integer"),

  validationErrors,
];
export const validateTaskStatus = [
  body("status")
    .notEmpty()
    .withMessage("task status is required")
    .isString()
    .withMessage("task name must be a string")
    .isIn(["incomplete", "complete", "pending"])
    .withMessage("task status must be either complete or incomplete"),
  validationErrors,
];

export const validateDeleteTask = [
  param("task_id")
    .notEmpty()
    .withMessage("task ID is required")
    .isInt()
    .withMessage("task ID must be an integer"),

  validationErrors,
];

export const validateUpdateTask = [
  body().custom((value, { req }) => {
    if (Object.keys(req.body).length === 0) {
      throw new ApiError(
        "You must provide: title or status or description at least one",
        400
      );
    }
    return true;
  }),
  body("title")
    .optional()
    .isString()
    .withMessage("Category name must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Category description must be a string"),
  body("status")
    .optional()
    .isString()
    .withMessage("Category status must be a string")
    .isIn(["incomplete", "complete", "pending"])
    .withMessage("Category status must be either complete or incomplete"),
  validationErrors,
];
