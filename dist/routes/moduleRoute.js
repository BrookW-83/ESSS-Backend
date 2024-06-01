"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const module_1 = require("../controllers/module");
const router = express_1.default.Router();
// get all modules
router.get("/all", module_1.getAllModules);
// get a module by id
router.get("/find/:id", module_1.getModule);
// create a module
router.post("/create", module_1.createModule);
//update a module
router.put("/:id", module_1.updateModule);
// delete a module
router.delete("/:id", module_1.deleteModule);
//search a module
router.get("/search", module_1.searchModule);
exports.default = router;
