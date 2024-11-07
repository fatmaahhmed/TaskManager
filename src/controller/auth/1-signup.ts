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
    const existing = await User.findOne({ email: user.email });
    if (existing) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    let newuser: { _id?: string } = {};
    await user
      .save()
      .then((user) => {
        newuser["_id"] = user._id as string;
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(`newuser ${JSON.stringify(newuser)}`);
    req.params.user_id = newuser._id as string;
    req.body.email = user.email;
    next();
    const message = `User added successfully`;
    console.log(req.token);
    res.status(201).json({ message, user, token: req.token });
  }
);
