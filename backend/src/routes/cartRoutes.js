import express from "express";
import * as cartController from "../controllers/cartController.js";

const router = express.Router();

// Add a product to the user's cart
router.post("/add", cartController.addToCart);

// Get the user's cart
router.get("/", cartController.getCart);

// Remove a product from the user's cart
router.delete("/remove/:productId", cartController.removeFromCart);

// Update the quantity of a product in the user's cart
router.put("/:productId", cartController.updateCartProduct);

// Empty the user's cart
router.delete("/empty", cartController.emptyCart);

export default router;
