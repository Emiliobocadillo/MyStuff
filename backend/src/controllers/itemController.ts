import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ItemModel from "../models/itemModel";
import createHttpError from "http-errors";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

// Get all items for the authenticated user
export const getItems = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await ItemModel.find({ user: req.user?.id });
    res.json(items);
  } catch (err) {
    const error = err as Error;
    next(createHttpError(500, error.message));
  }
};

// Get a single item by ID for the authenticated user
export const getItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const item = await ItemModel.findOne({ _id: id, user: req.user?.id });
    if (!item) {
      return next(createHttpError(404, "Item not found"));
    }
    res.json(item);
  } catch (err) {
    const error = err as Error;
    next(createHttpError(500, error.message));
  }
};

export const createItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      createHttpError(400, "Validation failed", { details: errors.array() })
    );
  }

  if (!req.body.labels || req.body.labels.length === 0) {
    return next(createHttpError(400, "At least one label is required."));
  }

  const newItem = new ItemModel({ ...req.body, user: req.user?.id });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    const error = err as Error;
    next(createHttpError(500, error.message));
  }
};

// Update an item by ID for the authenticated user
export const updateItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      createHttpError(400, "Validation failed", { details: errors.array() })
    );
  }

  try {
    const { id } = req.params;
    const updatedItem = await ItemModel.findOneAndUpdate(
      { _id: id, user: req.user?.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return next(createHttpError(404, "Item not found"));
    }
    res.json(updatedItem);
  } catch (err) {
    const error = err as Error;
    next(createHttpError(500, error.message));
  }
};

// Delete an item by ID for the authenticated user
export const deleteItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedItem = await ItemModel.findOneAndDelete({
      _id: id,
      user: req.user?.id,
    });
    if (!deletedItem) {
      return next(createHttpError(404, "Item not found"));
    }
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    const error = err as Error;
    next(createHttpError(500, error.message));
  }
};

// Create multiple items
export const createMultipleItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = req.body.items;
    if (!Array.isArray(items) || items.length === 0) {
      throw createHttpError(400, "Invalid items data");
    }
    const savedItems = await ItemModel.insertMany(items);
    res.status(201).json(savedItems);
  } catch (err) {
    const error = err as Error;
    next(createHttpError(500, error.message));
  }
};

// Get aggregated analytics data for the authenticated user
export const getAnalytics = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    // Total items
    const totalItems = await ItemModel.countDocuments({ user: userId });

    // Items by category
    const itemsByCategory = await ItemModel.aggregate([
      { $match: { user: userId } },
      { $unwind: "$labels" },
      { $group: { _id: "$labels", count: { $sum: 1 } } },
    ]);

    // Total value of items
    const totalValue = await ItemModel.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    res.json({
      totalItems,
      itemsByCategory,
      totalValue: totalValue[0]?.total || 0,
    });
  } catch (err) {
    const error = err as Error;
    next(createHttpError(500, error.message));
  }
};
