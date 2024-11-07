import { Router } from "express";
import { generateAuthToken } from "../../middlewares/auth/generateToken";
import { login } from "../../controller/auth/2-login";
import { validateLogin } from "../../utils/Validations/loginValidation";
export const loginRouter = Router();
loginRouter.post("/", validateLogin, login, generateAuthToken);
