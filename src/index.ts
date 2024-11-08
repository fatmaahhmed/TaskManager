import express, { Request, Response } from "express";

import { applyMiddlewares } from "./middlewares/routes/mainRoutesMiddleware";
import { applyRoutes } from "./Routes/MainRoutes/serverRoute";
import { dbConnection } from "./db/db";
import dotenv from "dotenv";
import swaggerSpec from "./swaggerConfig";
import swaggerUi from "swagger-ui-express";

dotenv.config();
//

const app = express();
const port = process.env.PORT || 4000;
// Serve Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const startServer = async () => {
  await dbConnection();
  applyMiddlewares(app);
  applyRoutes(app);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
  });
};

startServer();
