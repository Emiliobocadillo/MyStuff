import { Request, Response, NextFunction } from "express";
import ItemModel from "../models/itemModel";

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
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};
