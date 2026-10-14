import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import productRoutes from "./routes/product.routes.js";

import healthRoutes from "./routes/health.routes.js";

const app = express();

// Security-related HTTP headers
app.use(helmet());

// Allow requests from our local React frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);

// Parse JSON request bodies, with a size limit
app.use(express.json({ limit: "1mb" }));

// Basic API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use("/api", apiLimiter);

// API routes
app.use("/api/health", healthRoutes);
app.use("/api/products", productRoutes);

// Unknown routes return a consistent JSON response
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Handle unexpected errors
app.use((err, req, res, next) => {
  console.error("API error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: "An unexpected server error occurred",
  });
});

export default app;
