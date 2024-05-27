import { Schema, model, Document } from "mongoose";

// Define the Item Interface
interface IItem extends Document {
  name: string;
  quantity: number;
  labels: string[];
  description?: string;
  brand?: string;
  size?: string;
  color?: string;
  price?: number;
  user: Schema.Types.ObjectId; // Reference to the User
}

// Create the Mongoose Schema
const itemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    labels: {
      type: [String],
      required: true,
      validate: {
        validator: (labels: string[]) => labels.length > 0,
        message: "At least one label is required.",
      },
    },
    description: { type: String },
    brand: { type: String },
    size: { type: String },
    color: { type: String },
    price: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create and Export the Mongoose Model
const ItemModel = model<IItem>("Item", itemSchema);

export default ItemModel;
