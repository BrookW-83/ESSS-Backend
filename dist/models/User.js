"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        default: "user",
    },
    country: {
        type: String,
        default: "",
    },
    age: {
        type: Number,
        default: 0,
    },
    listOfCourses: {
        type: Array,
        default: [],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", UserSchema);
