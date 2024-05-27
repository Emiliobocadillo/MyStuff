import { Request, Response, NextFunction } from "express";
import env from "../util/validateEnv";
import { HttpError } from "http-errors";

// Centralized error-handling middleware
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack); // Log the error stack to the console for debugging

  let statusCode = 500;
  if (err instanceof HttpError) {
    statusCode = err.statusCode || 500;
  }

  res.status(statusCode).json({
    message: err.message,
    stack: env.NODE_ENV === "production" ? "Stack trace hidden" : err.stack,
  });
};

export default errorHandler;
