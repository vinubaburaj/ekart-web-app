import axios from "axios";
import Product from "../models/product.js";
import { mergeAndFilterProducts } from "../helpers/productHelper.js";
import reviewModel from "../models/review.js";

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
    const productData = req.body;

    // Check if the product already exists
    const existingProduct = await Product.findOne({
      id: parseInt(productData.id),
    });

    if (existingProduct) {
      return res.status(200).json({ message: "Product already exists" });
    }

    const product = new Product({
      ...productData,
      thumbnail: productData.thumbnail || "https://picsum.photos/400", // Use the
      // provided thumbnail or the default link
    });

    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    let product;
    const productId = req.params.id;

    // Search for the product in the database
    product = await Product.findOne({ id: productId });
    if (!product) {
      // If not found, search in the external API
      product = await axios.get(
        `${PRODUCTS_URL}/${encodeURIComponent(productId)}`
      );
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

    // Check if the product already exists in the database.
    // If a review for a product was created then it should exist in the db
    const productExists = await Product.findOne({ id: productId });

    if(productExists){
      // If product exists, fetch if there is any reviews for it
      const response = await reviewModel
      .find({ productId: productExists._id })
      .populate("user");
    res.status(200).json(response);
    return
    }
    else{
      // If product doesn't exist in db, return an empty array response
      res.status(200).json([])
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reviews for product" });
  }
};

export const addReviewForProduct = async (req, res) => {
  try {
    const user = req.session["currentUser"]._id;
    const product = req.body.product;
    const review = req.body.review;
    const productId = product.id;

    // Check if the product already exists in db
    const productExists = await Product.findOne({ id: productId });
    let productDbId = null;

    if (productExists) {
      // If product exists, then fetch it's _id
      productDbId = productExists._id;
    } else {
      // If product doesn't exist, create a new product in db
      const newProduct = new Product({
        ...product,
        thumbnail: product.thumbnail || "https://picsum.photos/400",
      });
      await newProduct.save();
      // Fetch the new product's id
      const fetchNewProduct = await Product.findOne({ id: productId });
      productDbId = fetchNewProduct._id;
    }

    // Create a new review with userid, productId(from db)
    const createdReview = await reviewModel.create({
      user: user,
      productId: productDbId,
      review: review,
    });

    const response = await createdReview.populate("user");
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding review for product" });
  }
};
