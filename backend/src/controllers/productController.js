import axios from "axios";
import Product from "../models/product.js";
import { mergeAndFilterProducts } from "../helpers/productHelper.js";
import reviewModel from "../models/review.js";
import mongoose from "mongoose";

const PRODUCTS_URL = "https://dummyjson.com/products";

export const searchProducts = async (req, res) => {
  try {
    const searchTerm = req.query.q;

    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    // Search in the database
    const dbSearchResults = await Product.find({
      title: { $regex: new RegExp(searchTerm, "i") }, // Case-insensitive search
    });

    // Search in the external API
    const searchUrl = `${PRODUCTS_URL}/search?q=${encodeURIComponent(
      searchTerm
    )}`;
    const apiResponse = await axios.get(searchUrl);
    const apiSearchResults = apiResponse.data.products;

    // Merge and filter results
    const mergedResults = mergeAndFilterProducts(
      dbSearchResults,
      apiSearchResults
    );

    res.status(200).json({ message: "Search successful", data: mergedResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // Fetch products from the external API
    const apiResponse = await axios.get(PRODUCTS_URL);
    const apiProducts = apiResponse.data.products;

    // Fetch products from the database
    const dbProducts = await Product.find();

    // Merge and filter products
    const mergedProducts = mergeAndFilterProducts(dbProducts, apiProducts);

    res.status(200).json(mergedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { id, thumbnail, ...productData } = req.body;

    const product = new Product({
      ...productData,
      dummyId: id, // Assign the id to dummyId
      thumbnail: thumbnail || "https://picsum.photos/400", // Use the provided thumbnail or the default link
    });

    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    let product;

    // Check if params.id is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      // If it's a valid ObjectId, find by MongoDB _id
      product = await Product.findById(req.params.id);
    } else {
      // If it's not a valid ObjectId, assume it's an integer and find by dummyId
      product = await Product.findOne({ dummyId: req.params.id });
    }

    if (!product) {
      // Handle the case where the product is not found
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReviewsForProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    let product;

    // Check if params.id is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(productId)) {
      // If it's a valid ObjectId, find by MongoDB _id
      product = await Product.findById(productId);
    } else {
      // If it's not a valid ObjectId, assume it's an integer and find by dummyId
      product = await Product.findOne({ dummyId: productId });
    }

    const response = await reviewModel
      .find(
        product && product.dummyId
          ? {
              $or: [{ productId: productId }, { productId: product.dummyId }],
            }
          : { productId }
      )
      .populate("user");
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reviews for product" });
  }
};

export const addReviewForProduct = async (req, res) => {
  try {
    const user = req.session["currentUser"]._id;
    const productId = req.params.productId;
    const review = req.body.review;
    const createdReview = await reviewModel.create({ user, productId, review });
    const response = await createdReview.populate("user");
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding review for product" });
  }
};
