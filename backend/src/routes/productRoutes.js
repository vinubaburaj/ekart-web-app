import express from "express";
import {
  searchProducts,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Search products route
router.get("/search", searchProducts);

router.get("/:productId", getProductById);

// Default all products route
router.get("/", getAllProducts);

// Create a new product
router.post("/products", createProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);


export default router;
