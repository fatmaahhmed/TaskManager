import express, { Request, Response } from "express";

import { dbConnection } from "./db";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const startServer = async () => {
  await dbConnection();
  console.log("database connection successfully");
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript with Express and MongoDB Atlas!");
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();
