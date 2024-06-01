"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const verifyToken_1 = require("../verifyToken");
const router = express_1.default.Router();
//update user
router.put("/:id", verifyToken_1.verifyToken, users_1.updateUser);
//delete user
router.delete("/:id", verifyToken_1.verifyToken, users_1.deleteUser);
//get a user
router.get("/find/:id", verifyToken_1.verifyToken, users_1.getUser);
//subscribe to a course
router.put("/enroll/:id", verifyToken_1.verifyToken, users_1.enroll);
//withdraw a course
router.put("/withdraw/:id", verifyToken_1.verifyToken, users_1.withdraw);
// enroll course
router.get("/enrolledCourses", verifyToken_1.verifyToken, users_1.getEnrolledCourses);
exports.default = router;
