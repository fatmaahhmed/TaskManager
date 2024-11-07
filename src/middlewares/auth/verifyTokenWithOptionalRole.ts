import { NextFunction, Request, Response } from "express";

import ApiError from "../../utils/err/ApiErrorHandler";
import { ExtendedRequest } from "../../utils/Types/request/request";
import { JwtPayload } from "./generateToken";
import jwt from "jsonwebtoken";

// Helper function to verify token
async function decodeToken(
  token: string,
  privateKey: string
): Promise<JwtPayload> {
  try {
    const jsonwt = jwt.verify(token, privateKey) as JwtPayload;
    return jsonwt;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new ApiError("Token verification failed", 401);
  }
}
export const isAuthenticated = () => {
  return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
      }
      const jwtPrivateKey = process.env.JWTPRIVATEKEY;
      if (!jwtPrivateKey) {
        res.status(500).json({
          message: "Internal Server Error: JWT private key is missing",
        });
        return;
      }
      const decoded = await decodeToken(token, jwtPrivateKey);
      console.log("decoded Token-->", decoded);
      req.body.email = decoded.email.toString();
      req.params.user_id = decoded.user_id.toString();

      console.log("req.params.user_id-->", req.params.user_id);

      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Unauthorized: Invalid token" });
      return;
    }
  };
};
