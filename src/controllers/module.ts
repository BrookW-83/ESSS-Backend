import { NextFunction, Request, Response } from "express";
import Module from "../models/Module";
import { createError } from "../error";
interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}

// // get all modules
export const getAllModules = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    //Get sort parameter from query
    const sortField = req.query.sort || "part";
    const sortOrder = req.query.order === "desc" ? -1 : 1; // default to ascending order
    const modules = await Module.find().sort({
      [sortField.toString()]: sortOrder,
    });

    res.status(200).json(modules);
  } catch (error) {
    next(error);
  }
};

//get all modules of a subCourse
export const getModules = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const sortField = req.query.sort || "part";
    const sortOrder = req.query.order === "desc" ? -1 : 1; // default to ascending order
    const modules = await Module.find({
      subCourseId: req.params.subCourseId,
    }).sort({ [sortField.toString()]: sortOrder });
    res.status(200).json(modules);
  } catch (error) {
    next(error);
  }
};
// // get a module by id
export const getModule = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.status(200).json(module);
  } catch (error) {
    next(error);
  }
};

// // create a module
export const createModule = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const newModule = new Module(req.body);
    newModule.save();
    res.status(201).json({ message: "Module has been created" });
  } catch (error) {
    next(error);
  }
};
// //update a module
export const updateModule = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return next(createError("Module not found", 404));
    const updateModule = await Module.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updateModule);
  } catch (error) {
    next(error);
  }
};
// // delete a module
export const deleteModule = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return next(createError("Module not found", 404));
    await Module.findByIdAndDelete(req.params.id);
    res.status(200).json("Module has been deleted");
  } catch (error) {
    next(error);
  }
};
// //search a module
export const searchModule = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.title;

    const allModules = await Module.find();
    const filteredModule = allModules.filter((module) =>
      module.title
        .toLowerCase()
        .includes(query ? query.toString().toLowerCase() : "")
    );
    res.status(200).json(filteredModule);
  } catch (error) {
    next(error);
  }
};
