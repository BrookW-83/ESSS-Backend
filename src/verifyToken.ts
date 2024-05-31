import jwt from "jsonwebtoken";
import { createError } from "./error";
import { NextFunction, Request, Response } from "express";

interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}
export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError("You need to login", 401));

  jwt.verify(token, process.env.SECRET_KEY, (err: any, user: any) => {
    if (err) return next(createError("Token is not valid!", 403));
    req.user = user;
    next();
  });
};
