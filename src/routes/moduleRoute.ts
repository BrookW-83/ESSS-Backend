import express from "express";
import { verifyToken } from "../verifyToken";
import {
  createModule,
  deleteModule,
  getAllModules,
  getModule,
  searchModule,
  updateModule,
} from "../controllers/module";

const router = express.Router();

// get all modules
router.get("/all", getAllModules);
// get a module by id
router.get("/find/:id", getModule);
// create a module
router.post("/create", createModule);
//update a module
router.put("/:id", updateModule);
// delete a module
router.delete("/:id", deleteModule);
//search a module
router.get("/search", searchModule);

export default router;
