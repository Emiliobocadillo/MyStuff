import { Router } from "express";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController";
import {
  validateCreateItem,
  validateUpdateItem,
} from "../middleware/validateItem";

const router = Router();

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", validateCreateItem, createItem); // Add validation middleware
router.patch("/:id", validateUpdateItem, updateItem); // Add validation middleware
router.delete("/:id", deleteItem);

export default router;
