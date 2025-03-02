import  express  from "express";
import { authMiddleware } from "../middleware/authMiddleWare";
import { instructorProfile, editInstructorProfile } from "../controllers/instructor";


const router = express.Router();

//Get instructor profile
router.get("/:userId", authMiddleware(["admin", "instructor"]), instructorProfile);

//Edit instructor profile 
router.put("/:userId", authMiddleware(["admin", "instructor"]), editInstructorProfile);


export default router;