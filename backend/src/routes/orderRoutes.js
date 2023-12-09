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

// Get details of a specific order
router.get("/:orderId", getOrderDetails);

// Cancel an order
router.put("/:orderId/cancel", cancelOrder);

export default router;
