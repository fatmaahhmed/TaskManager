import { NextFunction, Request, Response } from "express";

import { ExtendedRequest } from "../../utils/Types/request/request";
import jwt from "jsonwebtoken";

require("dotenv").config();
export type JwtPayload = {
  email: string;
  user_id: number;
};

export const generateAuthToken = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const privateKey = process.env.JWTPRIVATEKEY; // Make sure this matches your .env file
  if (!privateKey) {
    throw new Error("Private key is not defined in environment variables.");
  }
  const payload: JwtPayload = {
    email: req.email || "",
    user_id: +req.params.user_id,
  };
  console.log(`payload: ${JSON.stringify(payload)}`);
  const token = jwt.sign(payload, privateKey, { expiresIn: "5h" });
  req.token = token;
};
