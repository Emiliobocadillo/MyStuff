import { Router } from "express";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  createMultipleItems,
  getAnalytics,
} from "../controllers/itemController";
import {
  validateCreateItem,
  validateUpdateItem,
} from "../middleware/validateItem";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();
router.use(requireAuth);

router.post("/bulk", createMultipleItems);
router.get("/analytics", getAnalytics); // Add the analytics route
router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", validateCreateItem, createItem); // Add validation middleware
router.patch("/:id", validateUpdateItem, updateItem); // Add validation middleware
router.delete("/:id", deleteItem);

export default router;
