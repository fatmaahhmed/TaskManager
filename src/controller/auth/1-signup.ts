import { NextFunction, Request, Response } from "express";

import { ExtendedRequest } from "../../utils/Types/request/request";
import User from "../../db/models/user";
import asyncHandler from "express-async-handler";
import { hashPassword } from "../../utils/HassingPasswordFunction/hashPassword";

export const signUp = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    let { password } = req.body;
    password = await hashPassword(password);
    req.body.password = password;
    console.log(`req.body ${JSON.stringify(req.body)}`);
    const user = new User({ ...req.body });
    // check if user exists
    // find user by email

    const existing = await User.findOne({ email: user.email });
    if (existing) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    await user
      .save()
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
    // req.params.user_id = user.user_id.toString();
    req.body.email = user.email;
    next();
    const message = `User added successfully`;
    console.log(req.token);
    res.status(201).json({ message, user, token: req.token });
  }
);
