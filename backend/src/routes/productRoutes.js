import express from "express";
import {
  searchProducts,
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

// Search products route
router.get("/search", searchProducts);

router.get("/:productId", getProductById);

// Default all products route
router.get("/", getAllProducts);

export default router;
