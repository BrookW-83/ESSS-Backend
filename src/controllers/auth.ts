import { Request, Response } from "express";
import {User} from "../models/index";
import bcrypt from "bcryptjs";
import { createError } from "../error";
import jwt from "jsonwebtoken";

// signup
export const signup = async (req: Request, res: Response, next: any) => {
  const { email, password } = req.body;

  try {
    // check if user already exists
    const existingUser = await User.findOne({where: {email}});

    if (existingUser) {
      return next(createError("User already exists!", 400));
    }

    //create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ ...req.body, password: hashedPassword });
    console.log(newUser);
    return res.status(201).json("User created successfully!");
  } catch (err) {
    next(err);
  }
};

// sigin
export const signin = async (req: Request, res: Response, next: any) => {
  const { email, password } = req.body;

  //check if email exists
  try {
    const user = await User.findOne({ where: email });
    if (!user) return res.status(400).json("User not found!");

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.password
    );
    if (!isCorrectPassword) return next(createError("Invalid password!", 400));

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY!);
    const { password:_, ...others } = user.get({plain: true});
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};
