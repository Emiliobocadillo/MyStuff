import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import env from "../util/validateEnv";
import createHttpError from "http-errors";

const JWT_SECRET = env.JWT_SECRET;

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.signup(email, password);
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ token, email: user.email });
  } catch (err) {
    const error = err as Error; // Cast err to Error type
    if (error.message.includes("Email")) {
      next(createHttpError(409, error.message)); // Create a 409 Conflict error
    } else {
      next(createHttpError(500, error.message)); // Forward error to the error-handling middleware
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, email: user.email });
  } catch (err) {
    const error = err as Error; // Cast err to Error type
    if (
      error.message.includes("Incorrect email") ||
      error.message.includes("Incorrect password")
    ) {
      next(createHttpError(401, error.message)); // Create a 401 Unauthorized error
    } else {
      next(createHttpError(500, error.message)); // Forward error to the error-handling middleware
    }
  }
};
