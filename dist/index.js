"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainRoutesMiddleware_1 = require("./middlewares/routes/mainRoutesMiddleware");
const serverRoute_1 = require("./Routes/MainRoutes/serverRoute");
const db_1 = require("./db/db");
const dotenv_1 = __importDefault(require("dotenv"));
const swaggerConfig_1 = __importDefault(require("./swaggerConfig"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config();
//
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// Serve Swagger docs
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.default));
const startServer = async () => {
    await (0, db_1.dbConnection)();
    (0, mainRoutesMiddleware_1.applyMiddlewares)(app);
    (0, serverRoute_1.applyRoutes)(app);
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
        console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
    });
};
startServer();
