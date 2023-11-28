import express from "express";
import { searchProducts, getAllProducts } from "../controllers/productController.js";

const router = express.Router();

// Default products route
router.get("/", getAllProducts)

// Search products route
router.get("/search", searchProducts);

export default router;
