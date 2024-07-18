import { NextFunction, Request, Response } from "express";
import SubCouse from "../models/SubCouse";
import { createError } from "../error";
import Course from "../models/Course";

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
    // update course to have subCourse
    if (subCourse) {
      Course.findByIdAndUpdate(
        subCourse?.courseID,
        { $push: { subCourses: subCourse._id } },
        { new: true }
      );
    }
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
    // delete subCourse from course
    Course.findByIdAndUpdate(
      subCourse?.courseID,
      { $pull: { subCourses: subCourse?._id } },
      { new: true }
    );
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
    const sortField = req.query.sort || "title";
    const sortOrder = req.query.order === "desc" ? -1 : 1; // default to ascending order
    const subCourses = await SubCouse.find().sort({
      [sortField.toString()]: sortOrder,
    });

    res.status(200).json(subCourses);
  } catch (error) {
    next(error);
  }
};

//get subCourses by course
export const getSubCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sortField = req.query.sort || "part";
    const sortOrder = req.query.order === "desc" ? -1 : 1; // default to ascending order
    const subCourses = await SubCouse.find({
      courseID: req.params.courseId,
    }).sort({ [sortField.toString()]: sortOrder });

    res.status(200).json(subCourses);
  } catch (error) {
    next(error);
  }
};
