import express, { Request, Response } from "express";

import { applyMiddlewares } from "./middlewares/routes/mainRoutesMiddleware";
import { applyRoutes } from "./Routes/MainRoutes/serverRoute";
import { dbConnection } from "./db/db";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const startServer = async () => {
  await dbConnection();
  applyMiddlewares(app);
  applyRoutes(app);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();
