import { NextFunction, Request, Response } from "express";
import SubCouse from "../models/SubCouse";
import { createError } from "../error";

interface CustomRequest extends Request {
  params: any;
  user?: {
    id: string;
  };
}
//create subCourse
export const createSubCourse = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const subCourse = new SubCouse(req.body);
  try {
    subCourse.save();
    res.status(201).json("SubCourse has been created");
  } catch (error) {
    next(error);
  }
};

//get subCourse
export const getSubCourse = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const subCourse = await SubCouse.findById(req.params.id);
    if (!subCourse) return next(createError("SubCourse not found", 404));
    res.status(200).json(subCourse);
  } catch (error) {
    next(error);
  }
};

//delete subCourse
export const deleteSubCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subCourse = await SubCouse.findById(req.params.id);
    if (!subCourse) return next(createError("SubCourse not found", 404));
    await SubCouse.findByIdAndDelete(req.params.id);
    res.status(200).json("SubCourse has been deleted");
  } catch (error) {
    next(error);
  }
};

//update subCourse
export const updateSubCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subCourse = await SubCouse.findById(req.params.id);
    if (!subCourse) return next(createError("SubCourse not found", 404));
    await SubCouse.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json("SubCourse has been updated");
  } catch (error) {
    next(error);
  }
};

//get all subCourses
export const getAllSubCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subCourses = await SubCouse.find();
    res.status(200).json(subCourses);
  } catch (error) {
    next(error);
  }
};
