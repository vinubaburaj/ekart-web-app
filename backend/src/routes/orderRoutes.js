import express from "express";
import {
  createOrder,
  getUserOrderHistory,
  getOrderDetails,
  cancelOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// Create a new order
router.post("/", createOrder);

// Get user's order history
router.get("/", getUserOrderHistory);

// Cancel an order
router.put("/:orderId/cancel", cancelOrder);

// Get details of a specific order
router.get("/:userId/orders/:orderId", getOrderDetails);

export default router;
