import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ItemModel from "../models/itemModel";

// Get all items
export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await ItemModel.find();
    res.json(items);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Get a single item by ID
export const getItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // throw new Error("Deliberate error for testing"); // Force an error

    const { id } = req.params;
    const item = await ItemModel.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Create a new item
export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newItem = new ItemModel(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Update an item by ID
export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updatedItem = await ItemModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Delete an item by ID
export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedItem = await ItemModel.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};
