"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const ApiErrorHandler_1 = __importDefault(require("../../utils/err/ApiErrorHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Helper function to verify token
async function decodeToken(token, privateKey) {
    try {
        const jsonwt = jsonwebtoken_1.default.verify(token, privateKey);
        return jsonwt;
    }
    catch (error) {
        console.error("Token verification failed:", error);
        throw new ApiErrorHandler_1.default("Token verification failed", 401);
    }
}
const isAuthenticated = () => {
    return async (req, res, next) => {
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
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
        }
        catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).json({ message: "Unauthorized: Invalid token" });
            return;
        }
    };
};
exports.isAuthenticated = isAuthenticated;
