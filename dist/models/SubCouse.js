"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SubCourseSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    courseID: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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
    listOfModules: {
        type: Array,
        default: [],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("SubCourse", SubCourseSchema);
