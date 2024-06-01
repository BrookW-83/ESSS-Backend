import express from "express";
import { verifyToken } from "../verifyToken";
import {
  allCourses,
  categoryCourses,
  createCourse,
  deleteCourse,
  getCourse,
  searchCourse,
  updateCourse,
} from "../controllers/course";

const router = express.Router();

router.post("/create", verifyToken, createCourse);
router.get("/find/:id", getCourse);
router.put("/:id", verifyToken, updateCourse);
router.delete("/:id", verifyToken, deleteCourse);
router.get("/getAllCourses", allCourses);
router.get("/getByCategory/:category", categoryCourses);
router.get("/searchCourse/", searchCourse);

export default router;
