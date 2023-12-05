import express from "express";
import {
  searchProducts,
  getAllProducts,
  getProductById,
  getReviewsForProduct,
  addReviewForProduct
} from "../controllers/productController.js";

const router = express.Router();

// Search products route
router.get("/search", searchProducts);

router.get("/:productId", getProductById);

router.get("/:productId/reviews", getReviewsForProduct);

router.post("/:productId/reviews", addReviewForProduct);

// Default all products route
router.get("/", getAllProducts);

export default router;
