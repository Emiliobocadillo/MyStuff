import { Request, Response, NextFunction } from "express";

// Centralized error-handling middleware
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error stack to the console for debugging
  console.error(err.stack);

  // Send a JSON response to the client
  res.status(500).json({
    message: err.message,
    // In production, avoid exposing stack traces to the user
    stack:
      process.env.NODE_ENV === "production" ? "Stack trace hidden" : err.stack,
  });
};

export default errorHandler;
