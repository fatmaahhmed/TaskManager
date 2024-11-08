"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const user_1 = __importDefault(require("../../db/models/user"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const hashPassword_1 = require("../../utils/HassingPasswordFunction/hashPassword");
exports.signUp = (0, express_async_handler_1.default)(async (req, res, next) => {
    let { password } = req.body;
    password = await (0, hashPassword_1.hashPassword)(password);
    req.body.password = password;
    console.log(`req.body ${JSON.stringify(req.body)}`);
    const user = new user_1.default(Object.assign({}, req.body));
    const existing = await user_1.default.findOne({ email: user.email });
    if (existing) {
        res.status(400).json({ message: "User already exists" });
        return;
    }
    let newuser = {};
    await user
        .save()
        .then((user) => {
        newuser["_id"] = user._id;
        console.log(user);
    })
        .catch((err) => {
        console.log(err);
    });
    console.log(`newuser ${JSON.stringify(newuser)}`);
    req.params.user_id = newuser._id;
    req.body.email = user.email;
    next();
    const message = `User added successfully`;
    console.log(req.token);
    res.status(201).json({ message, user, token: req.token });
});
