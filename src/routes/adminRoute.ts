import express from "express";
import { authMiddleware } from "../middleware/authMiddleWare";
import {
  enrollInstructor,
  instructorProfile,
  editInstructorProfile,
  deleteInstructor,
} from "../controllers/instructor";
import { adminProfile, editAdminProfile,  } from "../controllers/admin";

const router = express.Router();

//Enroll an instructor
router.post("/enroll", authMiddleware(["admin"]), enrollInstructor);

//Get instructor profile
router.get("/:userId", authMiddleware(["admin", "instructor"]), instructorProfile);

//Edit instructor profile
router.put("/:userId", authMiddleware(["admin", "instructor"]), editInstructorProfile);

//Delete instructor
router.delete("/:userId", authMiddleware(["admin"]), deleteInstructor);

//Get admin profile
router.get("/:userId", authMiddleware(["admin"]), adminProfile);

//Edit admin profile
router.put("/:userId", authMiddleware(["admin"]), editAdminProfile);


export default router;
