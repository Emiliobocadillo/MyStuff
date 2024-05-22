import { check } from "express-validator";

// Validation middleware for creating a new item
export const validateCreateItem = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("quantity")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),
  check("labels").isArray().withMessage("Labels must be an array"),
];

// Validation middleware for updating an existing item
export const validateUpdateItem = [
  check("name")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Name cannot be empty if provided"),
  check("quantity")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer if provided"),
  check("labels")
    .optional()
    .isArray()
    .withMessage("Labels must be an array if provided"),
  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string if provided"),
  check("brand")
    .optional()
    .isString()
    .withMessage("Brand must be a string if provided"),
  check("size")
    .optional()
    .isString()
    .withMessage("Size must be a string if provided"),
  check("color")
    .optional()
    .isString()
    .withMessage("Color must be a string if provided"),
  check("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number if provided"),
];
