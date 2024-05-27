import express from "express";
import { getLabels } from "../controllers/labelController";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.use(requireAuth);


router.get("/", getLabels);

export default router;
