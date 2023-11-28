import express from "express";
import { searchProducts } from "../controllers/productController.js";

const router = express.Router();

// Search products route
router.get("/search", searchProducts);

export default router;
