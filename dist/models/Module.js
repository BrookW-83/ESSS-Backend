"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ModuleSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    subCourseId: {
        type: String,
        required: true,
    },
    listOfQuiz: {
        type: Array,
        default: [],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Module", ModuleSchema);
