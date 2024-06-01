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
exports.getEnrolledCourses = exports.withdraw = exports.enroll = exports.getUser = exports.deleteUser = exports.updateUser = void 0;
const error_1 = require("../error");
const User_1 = __importDefault(require("../models/User"));
const Course_1 = __importDefault(require("../models/Course"));
//Update user
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.params.id === req.user.id) {
        const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedUser);
    }
    else {
        return next((0, error_1.createError)("You are not authorized to  update this user", 403));
    }
});
exports.updateUser = updateUser;
//Delete a user
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.params.id === req.user.id) {
        try {
            yield User_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        }
        catch (error) {
            return next(error);
        }
    }
    else {
        return next((0, error_1.createError)("You are not authorized to delete this user", 403));
    }
});
exports.deleteUser = deleteUser;
// get a user
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.params.id === req.user.id) {
        try {
            const user = yield User_1.default.findById(req.params.id);
            res.status(200).json(user);
        }
        catch (error) {
            return next(error);
        }
    }
    else {
        return next((0, error_1.createError)("You are not authorized to get this user", 403));
    }
});
exports.getUser = getUser;
// enroll to a course
const enroll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        try {
            // check if user is already enrolled to the course
            const user = yield User_1.default.findById(req.user.id);
            if (user === null || user === void 0 ? void 0 : user.listOfCourses.includes(req.params.id)) {
                return next((0, error_1.createError)("You are already enrolled to this course", 409));
            }
            yield User_1.default.findByIdAndUpdate(req.user.id, {
                $push: { listOfCourses: req.params.id },
            });
            yield Course_1.default.findByIdAndUpdate(req.params.id, {
                $push: { listOfStudents: req.user.id },
            });
        }
        catch (error) {
            return next(error);
        }
        res.json("Subscribtion is success");
    }
});
exports.enroll = enroll;
// withdraw to a course
const withdraw = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        // check if user isnt enroleld to the course
        const user = yield User_1.default.findById(req.user.id);
        if (!(user === null || user === void 0 ? void 0 : user.listOfCourses.includes(req.params.id))) {
            return next((0, error_1.createError)("You are not enrolled to this course", 409));
        }
        try {
            yield User_1.default.findByIdAndUpdate(req.user.id, {
                $pull: { listOfCourses: req.params.id },
            });
            yield Course_1.default.findByIdAndUpdate(req.params.id, {
                $pull: { listOfStudents: req.user.id },
            });
        }
        catch (error) {
            return next(error);
        }
        res.json("Withdrawal is success");
    }
});
exports.withdraw = withdraw;
//get enrolled courses
const getEnrolledCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        const listOfCourses = (_b = user === null || user === void 0 ? void 0 : user.listOfCourses) !== null && _b !== void 0 ? _b : [];
        const enrolledCourses = yield Promise.all(listOfCourses.map((courseId) => {
            return Course_1.default.find({ _id: courseId });
        }));
        res
            .status(200)
            .json(enrolledCourses
            .flat()
            .sort((a, b) => b.createdAt - a.createdAt));
    }
    catch (error) {
        next(error);
    }
});
exports.getEnrolledCourses = getEnrolledCourses;
