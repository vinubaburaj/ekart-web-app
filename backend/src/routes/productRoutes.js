import express from "express";
import {
  addReviewForProduct,
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsBySeller,
  getRandomProducts,
  getReviewsForProduct,
  searchProducts,
  searchProductsBySeller,
  updateProduct
} from "../controllers/productController.js";

const router = express.Router();

// Create a new product
router.post("/", createProduct);

// Search products route
router.get("/search", searchProducts);

router.get("/seller", getProductsBySeller);

router.get("/:productId/reviews", getReviewsForProduct);

router.post("/:productId/reviews", addReviewForProduct);

// Default all products route
router.get("/", getAllProducts);

router.get("/random", getRandomProducts);

router.get("/:id", getProductById);

// Seller routes

router.get("/seller/:sellerId/search", searchProductsBySeller);

router.put("/seller/:id", updateProduct);

router.delete("/seller/:id", deleteProduct);

export default router;
