import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import env from "../util/validateEnv";
// import UserModel from "../models/userModel";

const JWT_SECRET = env.JWT_SECRET;

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    console.log("Authorization header missing");
    return next(createHttpError(401, "Authorization token required"));
  }

  const token = authorization.split(" ")[1];

  try {
    console.log("Token:", token);
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    console.log("Decoded token:", decoded);
    req.user = { id: decoded.id };

    // Optionally, verify the user exists in the database, this is a balance between security and performance
    // const user = await UserModel.findById(decoded.id);
    // if (!user) {
    //   return next(createHttpError(401, "User not found"));
    // }

    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    next(createHttpError(401, "Request is not authorized"));
  }
};
