import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    image: String,
    stock: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const productModel = mongoose.model("Product", productSchema);
