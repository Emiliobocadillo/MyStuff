import { Router } from "express";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  createMultipleItems,
} from "../controllers/itemController";
import {
  validateCreateItem,
  validateUpdateItem,
} from "../middleware/validateItem";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();
router.use(requireAuth);

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", validateCreateItem, createItem); // Add validation middleware
router.patch("/:id", validateUpdateItem, updateItem); // Add validation middleware
router.delete("/:id", deleteItem);
router.post("/bulk", requireAuth, createMultipleItems); 

export default router;
