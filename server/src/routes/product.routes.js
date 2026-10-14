import { Router } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import Product from "../models/Product.js";

const router = Router();

const productSchema = z.object({
  name: z.string().trim().min(1).max(120),
  description: z.string().trim().max(1000).optional(),
  sku: z.string().trim().min(1).max(60),
  category: z.string().trim().min(1).max(80),
  price: z.number().finite().min(0),
  cost: z.number().finite().min(0),
  stock: z.number().int().min(0),
  unitsSold: z.number().int().min(0).optional(),
  status: z.enum(["active", "draft", "archived"]).optional(),
});

const updateProductSchema = productSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update",
  });

function handleError(error, res) {
  if (error instanceof z.ZodError) {
    return res.status(400).json({
      success: false,
      message: "Invalid product data",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A product with this SKU already exists",
    });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      success: false,
      message: "Product validation failed",
      errors: Object.values(error.errors).map((item) => item.message),
    });
  }

  console.error("Product API error:", error.message);

  return res.status(500).json({
    success: false,
    message: "An unexpected server error occurred",
  });
}

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    handleError(error, res);
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(req.params.id).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    handleError(error, res);
  }
});

// POST /api/products
router.post("/", async (req, res) => {
  try {
    const data = productSchema.parse(req.body);
    const product = await Product.create(data);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    handleError(error, res);
  }
});

// PATCH /api/products/:id
router.patch("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const data = updateProductSchema.parse(req.body);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      { new: true, runValidators: true },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    handleError(error, res);
  }
});

// DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    handleError(error, res);
  }
});

export default router;
