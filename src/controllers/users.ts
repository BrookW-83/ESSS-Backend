import { Request, Response, NextFunction } from "express";
import { createError } from "../error";
import User from "../models/User";
import Course from "../models/Course";
interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}

//Update user
export const updateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.params.id === req.user.id) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } else {
    return next(
      createError("You are not authorized to  update this user", 403)
    );
  }
};

//Delete a user
export const deleteUser = async (
  req: CustomRequest,
  res: Response,
  next: any
) => {
  if (req.user && req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      return next(error);
    }
  } else {
    return next(createError("You are not authorized to delete this user", 403));
  }
};

// get a user
export const getUser = async (req: CustomRequest, res: Response, next: any) => {
  if (req.user && req.params.id === req.user.id) {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  } else {
    return next(createError("You are not authorized to get this user", 403));
  }
};

// enroll to a course
export const enroll = async (req: CustomRequest, res: Response, next: any) => {
  if (req.user) {
    try {
      // check if user is already enrolled to the course
      const user = await User.findById(req.user.id);
      if (user?.listOfCourses.includes(req.params.id)) {
        return next(
          createError("You are already enrolled to this course", 409)
        );
      }

      await User.findByIdAndUpdate(req.user.id, {
        $push: { listOfCourses: req.params.id },
      });

      await Course.findByIdAndUpdate(req.params.id, {
        $push: { listOfStudents: req.user.id },
      });
    } catch (error) {
      return next(error);
    }
    res.json("Subscribtion is success");
  }
};

// withdraw to a course
export const withdraw = async (
  req: CustomRequest,
  res: Response,
  next: any
) => {
  if (req.user) {
    // check if user isnt enroleld to the course
    const user = await User.findById(req.user.id);
    if (!user?.listOfCourses.includes(req.params.id)) {
      return next(createError("You are not enrolled to this course", 409));
    }
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { listOfCourses: req.params.id },
      });

      await Course.findByIdAndUpdate(req.params.id, {
        $pull: { listOfStudents: req.user.id },
      });
    } catch (error) {
      return next(error);
    }
    res.json("Withdrawal is success");
  }
};

//get enrolled courses
export const getEnrolledCourses = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?.id);
    const listOfCourses = user?.listOfCourses ?? [];

    const enrolledCourses = await Promise.all(
      listOfCourses.map((courseId) => {
        return Course.find({ _id: courseId });
      })
    );

    res
      .status(200)
      .json(
        enrolledCourses
          .flat()
          .sort((a: any, b: any) => b.createdAt - a.createdAt)
      );
  } catch (error) {
    next(error);
  }
};
