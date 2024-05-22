import { Schema, model, Document } from "mongoose";

// Define the Item Interface
interface IItem extends Document {
  name: string;
  description: string;
  quantity: number;
  labels: string[];
  brand?: string;
  size?: string;
  color?: string;
  price?: number;
}

// Create the Mongoose Schema
const itemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    labels: { type: [String], required: true },
    description: { type: String },
    brand: { type: String },
    size: { type: String },
    color: { type: String },
    price: { type: Number },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create and Export the Mongoose Model
const ItemModel = model<IItem>("Item", itemSchema);

export default ItemModel;
