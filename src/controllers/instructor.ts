import { Request, Response } from "express";
import { User } from "../models/index";
import { Instructor } from "../models/index";
import { createError } from "../error";
import bcrypt from "bcryptjs";



// enroll instructor
export const enrollInstructor = async (req: Request, res: Response, next: any) => {
    try {
        const { firstName, lastName, email, password, phoneNumber, profilePicture, gender, role} = req.body;

        // check if email already is used
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return next(createError("Email already used!", 400));
        }

        // create new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newInstructor = await User.create({
          ...req.body,
          password: hashedPassword,
        });

        const userID = newInstructor.id;

        await Instructor.create({
          userId: userID,
        });

        console.log(newInstructor);
        return res.status(201).json("Instructor created successfully!");

    } catch (err) {
        next(err);
    }

}

//instructor profile
export const instructorProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const instructor = await Instructor.findOne({ where: { userId } });
    if (!instructor)
      return res.status(404).json({ message: "Instructor not found" });
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};



// edit instructor profile
export const editInstructorProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, phoneNumber, gender, profilePicture } =
      req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.update({
      firstName,
      lastName,
      phoneNumber,
      gender,
      profilePicture,
    });
    res
      .status(200)
      .json({ message: "Instructor profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// delete instructor
export const deleteInstructor = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const instructor = await Instructor.destroy({ where: { userId } });

    if (!instructor)
      return res.status(404).json({ message: "Instructor not found" });
    
    await User.destroy({ where: { id: userId, role: "instructor" } });
    res.status(200).json({ message: "Instructor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};