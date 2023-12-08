import express from "express";
import {
  addToWishlist,
  clearWishlist,
  getWishlist,
  moveAllToCart,
  moveToCart,
  removeFromWishlist
} from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/", getWishlist);
router.post("/", addToWishlist);
router.delete("/:productId", removeFromWishlist);
router.delete("/all", clearWishlist);
router.put("/", moveToCart);
router.put("/all", moveAllToCart);

export default router;