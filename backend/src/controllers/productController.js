import axios from "axios";
import Product from "../models/product.js";
import { mergeAndFilterProducts } from "../helpers/productHelper.js";

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
    const product = new Product(req.body);
    if (product.thumbnail && !!product.thumbnail.length) {
      product.thumbnail = "https://picsum.photos/400";
    }
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
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
