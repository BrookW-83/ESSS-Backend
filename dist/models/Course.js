"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CourseSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    category: {
        type: Array,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    thumbnail: {
        type: String,
        default: "",
    },
    listOfStudents: {
        type: Array,
        default: [],
    },
    listOfSubCourses: {
        type: Array,
        default: [],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Course", CourseSchema);
