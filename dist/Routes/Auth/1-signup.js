"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRouter = void 0;
const express_1 = require("express");
const generateToken_1 = require("../../middlewares/auth/generateToken");
const _1_signup_1 = require("../../controller/auth/1-signup");
const signUpValidation_1 = require("../../utils/Validations/signUpValidation");
exports.signupRouter = (0, express_1.Router)();
exports.signupRouter.post("/", signUpValidation_1.validateSignUp, _1_signup_1.signUp, generateToken_1.generateAuthToken);
// signupRouter.post("/", signUp, generateAuthToken);
