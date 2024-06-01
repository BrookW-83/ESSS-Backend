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
exports.searchModule = exports.deleteModule = exports.updateModule = exports.createModule = exports.getModule = exports.getAllModules = void 0;
const Module_1 = __importDefault(require("../models/Module"));
const error_1 = require("../error");
// // get all modules
const getAllModules = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modules = yield Module_1.default.find();
        res.status(200).json(modules);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllModules = getAllModules;
// // get a module by id
const getModule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const module = yield Module_1.default.findById(req.params.id);
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }
        res.status(200).json(module);
    }
    catch (error) {
        next(error);
    }
});
exports.getModule = getModule;
// // create a module
const createModule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newModule = new Module_1.default(req.body);
        newModule.save();
        res.status(201).json("Module has been created");
    }
    catch (error) {
        next(error);
    }
});
exports.createModule = createModule;
// //update a module
const updateModule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const module = yield Module_1.default.findById(req.params.id);
        if (!module)
            return next((0, error_1.createError)("Module not found", 404));
        const updateModule = yield Module_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(201).json(updateModule);
    }
    catch (error) {
        next(error);
    }
});
exports.updateModule = updateModule;
// // delete a module
const deleteModule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const module = yield Module_1.default.findById(req.params.id);
        if (!module)
            return next((0, error_1.createError)("Module not found", 404));
        yield Module_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Module has been deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteModule = deleteModule;
// //search a module
const searchModule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.q;
        const module = yield Module_1.default.find({
            title: { $regex: query, $options: "i" },
        }).limit(20);
        res.status(200).json(module);
    }
    catch (error) {
        next(error);
    }
});
exports.searchModule = searchModule;
