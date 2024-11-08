"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const generateAuthToken = async (req, res, next) => {
    const privateKey = process.env.JWTPRIVATEKEY; // Make sure this matches your .env file
    if (!privateKey) {
        throw new Error("Private key is not defined in environment variables.");
    }
    const payload = {
        email: req.body.email || "",
        user_id: req.params.user_id,
    };
    console.log(`payload: ${JSON.stringify(payload)}`);
    const token = jsonwebtoken_1.default.sign(payload, privateKey, { expiresIn: "5h" });
    req.token = token;
};
exports.generateAuthToken = generateAuthToken;
