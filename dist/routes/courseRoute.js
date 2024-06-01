"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../verifyToken");
const course_1 = require("../controllers/course");
const router = express_1.default.Router();
router.post("/create", verifyToken_1.verifyToken, course_1.createCourse);
router.get("/find/:id", course_1.getCourse);
router.put("/:id", verifyToken_1.verifyToken, course_1.updateCourse);
router.delete("/:id", verifyToken_1.verifyToken, course_1.deleteCourse);
router.get("/getAllCourses", course_1.allCourses);
router.get("/getByCategory/:category", course_1.categoryCourses);
router.get("/searchCourse/", course_1.searchCourse);
exports.default = router;
