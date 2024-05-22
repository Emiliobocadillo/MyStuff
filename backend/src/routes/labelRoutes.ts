import express from "express";
import { getLabels } from "../controllers/labelController";

const router = express.Router();

router.get("/", getLabels);

export default router;
