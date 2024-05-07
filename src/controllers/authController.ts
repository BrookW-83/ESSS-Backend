import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({ username, email, hashedPassword });
  
  try {
    await newUser.save();
    res.status(201).json("User created sucessfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
