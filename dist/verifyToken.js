"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token)
        return next((0, error_1.createError)("You need to login", 401));
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err)
            return next((0, error_1.createError)("Token is not valid!", 403));
        req.user = user;
        next();
    });
};
exports.verifyToken = verifyToken;
