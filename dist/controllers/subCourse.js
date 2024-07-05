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
exports.getAllSubCourses = exports.updateSubCourse = exports.deleteSubCourse = exports.getSubCourse = exports.createSubCourse = void 0;
const SubCouse_1 = __importDefault(require("../models/SubCouse"));
const error_1 = require("../error");
//create subCourse
const createSubCourse = (req, res, next) => {
    const subCourse = new SubCouse_1.default(req.body);
    try {
        subCourse.save();
        res.status(201).json("SubCourse has been created");
    }
    catch (error) {
        next(error);
    }
};
exports.createSubCourse = createSubCourse;
//get subCourse
const getSubCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCourse = yield SubCouse_1.default.findById(req.params.id);
        if (!subCourse)
            return next((0, error_1.createError)("SubCourse not found", 404));
        res.status(200).json(subCourse);
    }
    catch (error) {
        next(error);
    }
});
exports.getSubCourse = getSubCourse;
//delete subCourse
const deleteSubCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCourse = yield SubCouse_1.default.findById(req.params.id);
        if (!subCourse)
            return next((0, error_1.createError)("SubCourse not found", 404));
        yield SubCouse_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("SubCourse has been deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteSubCourse = deleteSubCourse;
//update subCourse
const updateSubCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCourse = yield SubCouse_1.default.findById(req.params.id);
        if (!subCourse)
            return next((0, error_1.createError)("SubCourse not found", 404));
        yield SubCouse_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json("SubCourse has been updated");
    }
    catch (error) {
        next(error);
    }
});
exports.updateSubCourse = updateSubCourse;
//get all subCourses
const getAllSubCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCourses = yield SubCouse_1.default.find();
        res.status(200).json(subCourses);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllSubCourses = getAllSubCourses;
