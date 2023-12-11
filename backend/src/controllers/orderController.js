import Order from "../models/order.js";
import User from "../models/user.js";

// Create a new order
const createOrder = async (req, res) => {
  try {
    const userId = req.session.currentUser._id;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    const { products } = req.body;

    // Calculate total amount based on products and quantities
    const totalAmount =
      products.reduce(
        (total, { product, quantity }) => total + product.price * quantity,
        0
      ) + 5;

    // Create a new order
    const order = new Order({
      user: userId,
      products,
      // added shipping cost
      totalAmount,
    });

    // Save the order
    await order.save();

    // Add the order to the user's order history
    await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

    const newOrder = await Order.findById(order._id).populate({
      path: "products",
      populate: {
        path: "product",
        model: "Product",
      },
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get user's order history
const getUserOrderHistory = async (req, res) => {
  try {
    const userId = req.session.currentUser._id;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find user and populate orders
    const user = await User.findById(userId).populate({
      path: "orders",
      populate: {
        path: "products.product",
        model: "Product",
      },
    });

    res.status(200).json(user.orders);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const userId = req.session.currentUser._id;
    const orderId = req.params.orderId;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has the specified order
    const user = await User.findById(userId).populate("orders");
    const orderToCancel = user.orders.find(
      (order) => order._id.toString() === orderId
    );

    if (!orderToCancel) {
      return res.status(404).json({ message: "Order not found for the user" });
    }

    // Perform cancellation logic (e.g., update isCancelled flag)
    orderToCancel.isCancelled = true;
    await orderToCancel.save();

    res
      .status(200)
      .json({ message: "Order canceled successfully", order: orderToCancel });
  } catch (error) {
    console.error("Error canceling order:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get details of a specific order
const getOrderDetails = async (req, res) => {
  try {
    const userId = req.session.currentUser._id;
    const orderId = req.params.orderId;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has the specified order
    const user = await User.findById(userId).populate("orders");
    const orderDetails = user.orders.find(
      (order) => order._id.toString() === orderId
    );

    if (!orderDetails) {
      return res.status(404).json({ message: "Order not found for the user" });
    }

    res.status(200).json(orderDetails);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ error: error.message });
  }
};

export { createOrder, getUserOrderHistory, getOrderDetails, cancelOrder };
