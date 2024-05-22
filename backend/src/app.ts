import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import itemRoutes from "./routes/itemRoutes";
import errorHandler from "./middleware/errorHandler";

const app = express();

// Use morgan to log requests to the console
app.use(morgan("dev"));

// Use cors to enable Cross-Origin Resource Sharing
app.use(cors());

app.use(express.json());

// Use item routes
app.use("/api/items", itemRoutes);

app.use(errorHandler);

export default app;
