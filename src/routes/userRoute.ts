import express from "express";
import {
  deleteUser,
  enroll,
  updateUser,
  getUser,
  withdraw,
  getEnrolledCourses,
} from "../controllers/users";
import { verifyToken } from "../verifyToken";

const router = express.Router();

//update user
router.put("/:id", verifyToken, updateUser);
//delete user
router.delete("/:id", verifyToken, deleteUser);
//get a user
router.get("/find/:id", verifyToken, getUser);
//subscribe to a course
router.put("/enroll/:id", verifyToken, enroll);
//withdraw a course
router.put("/withdraw/:id", verifyToken, withdraw);
// enroll course
router.get("/enrolledCourses", verifyToken, getEnrolledCourses);
export default router;
