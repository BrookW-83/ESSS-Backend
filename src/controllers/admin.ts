import { Request, Response } from "express";
import { User } from "../models/index";
import { Admin } from "../models/index";
import { createError } from "../error";
import bcrypt from "bcryptjs";

// create admin profile
export const createAdmin = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      profilePicture,
      gender,
      role,
    } = req.body;

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

    await Admin.create({
      userId: userID,
    });

    console.log(newInstructor);
    return res.status(201).json("Instructor created successfully!");
  } catch (err) {
    next(err);
  }
};

// get edit admin profile
export const adminProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const instructor = await Admin.findOne({ where: { userId } });
    if (!instructor)
      return res.status(404).json({ message: "Instructor not found" });
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// edit admin profile
export const editAdminProfile = async (req: Request, res: Response) => {
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

// delete admin
export const deleteAdminProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await Admin.destroy({ where: { userId } });
    await User.destroy({ where: { id: userId, role: "instructor" } });
    res.status(200).json({ message: "Instructor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
