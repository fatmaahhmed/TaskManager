"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// load environment variables
dotenv_1.default.config();
const mongoUri = process.env.MONGO_URI ||
    "mongodb+srv://TaskManager:Admin%40123@taskmanager.k1wuj.mongodb.net/TaskManager?retryWrites=true&w=majority";
if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is not defined");
}
const dbConnection = async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log("Connected to the database");
    }
    catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
};
exports.dbConnection = dbConnection;
