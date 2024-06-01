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
    const modules = await Module.find();
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
    res.status(201).json("Module has been created");
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
    const query = req.query.q;
    const module = await Module.find({
      title: { $regex: query, $options: "i" },
    }).limit(20);
    res.status(200).json(module);
  } catch (error) {
    next(error);
  }
};
