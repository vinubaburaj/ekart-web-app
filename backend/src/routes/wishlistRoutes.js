import express from "express";
import {
  addProductToWishlist,
  deleteProductFromWishlist,
  emptyWishlist,
  getWishlist,
  moveAllProductsToCart,
  moveProductToCart
} from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/", getWishlist);
router.put("/", moveAllProductsToCart);
router.delete("/", emptyWishlist);
router.post("/", addProductToWishlist);
router.delete("/:productId", deleteProductFromWishlist);
router.put("/:productId", moveProductToCart);

export default router;
