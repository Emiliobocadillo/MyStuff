import { Request, Response, NextFunction } from "express";
import ItemModel from "../models/itemModel";
import createHttpError from "http-errors";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

// Default labels
const defaultLabels = [
  "Clothes",
  "Electronics",
  "Kitchen",
  "Furniture",
  "Sport/Wellness",
];

// Get all labels for the authenticated user
export const getLabels = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(createHttpError(401, "Unauthorized"));
    }

    const items = await ItemModel.find({ user: userId });
    const labels = new Set<string>(defaultLabels);

    // Add user-specific labels
    items.forEach((item) => {
      item.labels.forEach((label) => labels.add(label));
    });

    res.json(Array.from(labels));
  } catch (err) {
    const error = err as Error;
    next(createHttpError(500, error.message));
  }
};
