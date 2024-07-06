import { NextFunction, Request, Response } from "express";
import Course from "../models/Course";
import { createError } from "../error";
interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}

//create course
export const createCourse = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const newCourse = new Course(req.body);
  try {
    newCourse.save();
    res.status(201).json("Course has been created");
  } catch (error) {
    next(error);
  }
};

// get course
export const getCourse = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  console.log(req.params);
  try {
    const course = await Course.findById(req.params.id);
    console.log(course);
    if (!course) return next(createError("Course not found", 404));
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// delete course
export const deleteCourse = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return next(createError("Course not found", 404));
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json("Course has been deleted");
  } catch (error) {
    next(error);
  }
};

// update course
export const updateCourse = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return next(createError("Course not found", 404));
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

//get all courses
export const allCourses = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// get courses by category
export const categoryCourses = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.query.category
      ? (req.query.category as string).split(",")
      : [];
    const courses = await Course.find({ category: { $in: category } });
    console.log(category, courses);
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// search course
export const searchCourse = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.title;

    const courses = await Course.find().limit(20);
    const filteredCourses = courses.filter((course) =>
      course.title
        .toLowerCase()
        .includes(query ? query.toString().toLowerCase() : "")
    );
    res.status(200).json(filteredCourses);
  } catch (error) {
    next(error);
  }
};
