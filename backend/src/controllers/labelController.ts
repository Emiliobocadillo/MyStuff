import { Request, Response, NextFunction } from "express";
import ItemModel from "../models/itemModel";
import createHttpError from "http-errors";

// Get all labels
export const getLabels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await ItemModel.find();
    const labels = new Set<string>();
    items.forEach((item) => {
      item.labels.forEach((label) => labels.add(label));
    });
    res.json(Array.from(labels));
  } catch (err) {
    const error = err as Error; // Cast err to Error type
    next(createHttpError(500, error.message)); // Forward error to the error-handling middleware
  }
};
