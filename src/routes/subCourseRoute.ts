import express from "express";

import { verifyToken } from "../verifyToken";
import {
  createSubCourse,
  deleteSubCourse,
  getAllSubCourses,
  getSubCourse,
  getSubCourses,
  updateSubCourse,
} from "../controllers/subCourse";

const router = express.Router();

router.post("/create", verifyToken, createSubCourse);
router.get("/find/:id", getSubCourse);
router.put("/:id", verifyToken, updateSubCourse);
router.delete("/:id", verifyToken, deleteSubCourse);
router.get("/getAllSubCourses", getAllSubCourses);
router.get("/getSubCourses/:courseId", getSubCourses);

export default router;
