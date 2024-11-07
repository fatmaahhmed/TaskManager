import { Router } from "express";
import { generateAuthToken } from "../../middlewares/auth/generateToken";
import { signUp } from "../../controller/auth/1-signup";
import { validateSignUp } from "../../utils/Validations/signUpValidation";

export const signupRouter = Router();
signupRouter.post("/", validateSignUp, signUp, generateAuthToken);
// signupRouter.post("/", signUp, generateAuthToken);
