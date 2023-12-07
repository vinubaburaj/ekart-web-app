import Product from "../models/product.js";
import User from "../models/user.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.session.currentUser._id;

    const user = await User.findById(userId);
    const product = await Product.findOne({id: parseInt(productId)});

    if (!user || !product) {
      return res.status(404).json({ message: "User or product not found" });
    }

    const existingCartItem = user.cart.find((item) =>
      item.product.equals(product._id)
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity || 1;
    } else {
      user.cart.push({ product: product._id, quantity: quantity || 1 });
    }

    await user.save();

    const updatedUser = await User.findById(userId).populate("cart.product");

    res
      .status(200)
      .json({
        message: "Product added to cart successfully",
        cart: updatedUser.cart,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.session.currentUser._id;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the user from the database
    const user = await User.findById(userId).populate("cart.product");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.session.currentUser._id;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter((item) => !item.product.equals(productId));

    await user.save();

    const updatedUser = await User.findById(userId).populate("cart.product");

    res
      .status(200)
      .json({
        message: "Product removed from cart successfully",
        cart: updatedUser.cart,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCartProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.session.currentUser._id;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the cart item with the specified product ID
    const cartItem = user.cart.find((item) => item.product.equals(productId));

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    // Update the quantity
    if (quantity > 0) {
      cartItem.quantity = quantity;
    } else {
      // If the quantity is 0, remove the product from the cart
      user.cart = user.cart.filter((item) => !item.product.equals(productId));
    }

    await user.save();
    const updatedUser = await User.findById(userId).populate("cart.product");

    res
      .status(200)
      .json({ message: "Cart updated successfully", cart: updatedUser.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const emptyCart = async (req, res) => {
  try {
    const userId = req.session.currentUser._id;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Empty the cart
    user.cart = [];

    await user.save();
    const updatedUser = await User.findById(userId).populate("cart.product");

    res
      .status(200)
      .json({ message: "Cart emptied successfully", cart: updatedUser.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
