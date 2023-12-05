import express from "express";
import {
  searchProducts,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getReviewsForProduct,
  addReviewForProduct
} from "../controllers/productController.js";

const router = express.Router();

// Create a new product
router.post("/", createProduct);

// Search products route
router.get("/search", searchProducts);

router.get("/:productId/reviews", getReviewsForProduct);

router.post("/:productId/reviews", addReviewForProduct);

// Default all products route
router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
