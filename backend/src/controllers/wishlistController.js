import User from "../models/user.js";
import Product from "../models/product.js";

export const addProductToWishlist = async (req, res) => {
  try {
    const productReq = req.body;
    const userId = req.session["currentUser"]._id;
    if (!userId) {
      return res.status(401).json({message: "Unauthorized"});
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: "User or product not found"});
    }
    let product;
    // Check if the product already exists in db
    const dbProduct = await Product.findOne({id: parseInt(productReq.id)});

    if (!dbProduct) {
      // If product doesn't exist, create a new product in db
      await Product.create(productReq);
      product = await Product.findOne({id: parseInt(productReq.id)});
    } else {
      // If product exists, then use it
      product = dbProduct;
    }

    const existingWishlistItem = user.wishlist.find(
        (item) => item.product.equals(product._id));
    if (existingWishlistItem) {
      res.status(400).json({message: "Product already in wishlist"});
    } else {
      user.wishlist.push({product: product._id});
    }
    await user.save();
    const updatedUser = await User.findById(userId).populate(
        "wishlist.product");
    res.status(200).json({
      message: "Product added to wishlist successfully",
      wishlist: updatedUser.wishlist
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
}

export const getWishlist = async (req, res) => {
  try {
    const userId = req.session["currentUser"]?._id;
    if (!userId) {
      return res.status(401).json({message: "Unauthorized"});
    }
    const user = await User.findById(userId).populate("wishlist.product");
    if (!user) {
      return res.status(403).json({message: "User not found"});
    }
    res.status(200).json({wishlist: user.wishlist});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
}

export const deleteProductFromWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.session["currentUser"]?._id;
    if (!userId) {
      return res.status(401).json({message: "Unauthorized"});
    }
    const user = await User.findById(userId);
    const product = await Product.findOne({id: parseInt(productId)});
    if (!user || !product) {
      return res.status(403).json({message: "User or product not found"});
    }

    const existingWishlistItem = user.wishlist.find(
        (item) => item.product.equals(product._id));
    if (!existingWishlistItem) {
      res.status(200).json({message: "Product not in wishlist"});
    } else {
      user.wishlist.pull(existingWishlistItem);
    }
    await user.save();
    const updatedUser = await User.findById(userId).populate(
        "wishlist.product");
    res.status(200).json({
      message: "Product removed from wishlist successfully",
      wishlist: updatedUser.wishlist
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
}

export const emptyWishlist = async (req, res) => {
  try {
    const userId = req.session["currentUser"]?._id;
    if (!userId) {
      return res.status(401).json({message: "Unauthorized"});
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({message: "User not found"});
    }
    user.wishlist = [];
    await user.save();
    const updatedUser = await User.findById(userId).populate(
        "wishlist.product");
    res.status(200).json({
      message: "Wishlist emptied successfully",
      wishlist: updatedUser.wishlist
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
}

export const moveProductToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.session["currentUser"]?._id;
    if (!userId) {
      return res.status(401).json({message: "Unauthorized"});
    }
    const user = await User.findById(userId);
    const product = await Product.findOne({id: parseInt(productId)});
    if (!user || !product) {
      return res.status(403).json({message: "User or product not found"});
    }

    const existingWishlistItem = user.wishlist.find(
        (item) => item.product.equals(product._id));
    if (!existingWishlistItem) {
      res.status(200).json({message: "Product not in wishlist"});
    } else {
      user.wishlist.pull(existingWishlistItem);
      const existingCartItem = user.cart.find(
          (item) => item.product.equals(product._id));
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        user.cart.push({product: product._id, quantity: 1});
      }
    }
    await user.save();
    const updatedUser = await User.findById(userId).populate(
        "wishlist.product");
    res.status(200).json({
      message: "Product moved to cart successfully",
      wishlist: updatedUser.wishlist,
      cart: updatedUser.cart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
}

export const moveAllProductsToCart = async (req, res) => {
  try {
    const userId = req.session["currentUser"]?._id;
    if (!userId) {
      return res.status(401).json({message: "Unauthorized"});
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({message: "User not found"});
    }
    // Move all products from wishlist to cart. If product already exists in
    // cart, increment the quantity by 1
    for (const wishlistItem of user.wishlist) {
      const existingCartItem = user.cart.find(
          (item) => item.product.equals(wishlistItem.product));
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        user.cart.push({product: wishlistItem.product, quantity: 1});
      }
    }
    user.wishlist = [];
    await user.save();
    res.status(200).json({
      message: "All products moved to cart successfully",
      cart: user.cart,
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
}