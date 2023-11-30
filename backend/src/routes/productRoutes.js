import express from "express";
import {
  searchProducts,
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/:productId", getProductById);

// Search products route
router.get("/search", searchProducts);

// Default all products route
router.get("/", getAllProducts);

export default router;
