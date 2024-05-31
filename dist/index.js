"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
console.log(process.env.MONGO_URL);
const connect = () => {
    mongoose_1.default
        .connect(process.env.MONGO_URL)
        .then(() => {
        console.log("connected to database");
    })
        .catch((error) => {
        console.error("Error connecting to database", error);
    });
};
// app.use("api/users", userRoutes);
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
