import { NextFunction, Request, Response } from "express";

import ApiError from "../../utils/err/ApiErrorHandler";
import { ExtendedRequest } from "../../utils/Types/request/request";
import User from "../../db/models/user";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

export const login = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError("Please provide an email and password", 400);
    }
    // check if user exists
    const user = (await User.findOne({ email })) as {
      _id: string;
      email: string;
      password: string;
    };

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError("Invalid email or password", 401);
    }
    req.params.user_id = user._id.toString();
    req.email = user.email;
    next();
    res.status(200).json({ message: "Login successful", token: req.token });
  }
);
