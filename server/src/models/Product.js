import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [120, "Product name cannot exceed 120 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },

    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    cost: {
      type: Number,
      required: [true, "Product cost is required"],
      min: [0, "Cost cannot be negative"],
    },

    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Stock must be a whole number",
      },
    },

    unitsSold: {
      type: Number,
      default: 0,
      min: [0, "Units sold cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Units sold must be a whole number",
      },
    },

    status: {
      type: String,
      enum: ["active", "draft", "archived"],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.index({ category: 1, status: 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;
