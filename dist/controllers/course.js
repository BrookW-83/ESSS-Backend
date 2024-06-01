"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCourse = exports.categoryCourses = exports.allCourses = exports.updateCourse = exports.deleteCourse = exports.getCourse = exports.createCourse = void 0;
const Course_1 = __importDefault(require("../models/Course"));
const error_1 = require("../error");
//create course
const createCourse = (req, res, next) => {
    const newCourse = new Course_1.default(req.body);
    try {
        newCourse.save();
        res.status(201).json("Course has been created");
    }
    catch (error) {
        next(error);
    }
};
exports.createCourse = createCourse;
// get course
const getCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    try {
        const course = yield Course_1.default.findById(req.params.id);
        console.log(course);
        if (!course)
            return next((0, error_1.createError)("Course not found", 404));
        res.status(200).json(course);
    }
    catch (error) {
        next(error);
    }
});
exports.getCourse = getCourse;
// delete course
const deleteCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_1.default.findById(req.params.id);
        if (!course)
            return next((0, error_1.createError)("Course not found", 404));
        yield Course_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Course has been deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCourse = deleteCourse;
// update course
const updateCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_1.default.findById(req.params.id);
        if (!course)
            return next((0, error_1.createError)("Course not found", 404));
        const updatedCourse = yield Course_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(201).json(updatedCourse);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCourse = updateCourse;
//get all courses
const allCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield Course_1.default.find();
        res.status(200).json(courses);
    }
    catch (error) {
        next(error);
    }
});
exports.allCourses = allCourses;
// get courses by category
const categoryCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.query.category
            ? req.query.category.split(",")
            : [];
        const courses = yield Course_1.default.find({ category: { $in: category } });
        console.log(category, courses);
        res.status(200).json(courses);
    }
    catch (error) {
        next(error);
    }
});
exports.categoryCourses = categoryCourses;
// search course
const searchCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.q;
        const courses = yield Course_1.default.find({
            title: { $regex: String(query), $options: "i" },
        }).limit(20);
        res.status(200).json(courses);
    }
    catch (error) {
        next(error);
    }
});
exports.searchCourse = searchCourse;
