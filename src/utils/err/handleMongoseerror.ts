import ApiError from "./ApiErrorHandler";
import { Error as MongooseError } from "mongoose";

export const handleMongooseError = (error: any): ApiError => {
  console.log("error", error);
  if (error instanceof MongooseError) {
    if (error instanceof MongooseError.ValidationError) {
      console.log("Validation error");
      return new ApiError(`Validation error: ${error.message}`, 400);
    }
    if (error instanceof MongooseError.CastError) {
      console.log("Cast error");
      return new ApiError(`Cast error: ${error.message}`, 400);
    }
    if ((error as any).code === 11000) {
      // Duplicate key error
      console.log("Duplicate key error");
      return new ApiError(`Duplicate key error: ${error.message}`, 409);
    }
    console.log("Mongoose error", error);
    return new ApiError(`Mongoose error: ${error.message}`, 500);
  }
  console.error("An unexpected error occurred", error);
  return new ApiError("An unexpected error occurred", 500);
};
