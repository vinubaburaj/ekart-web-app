import axios from "axios";
import * as httpService from "../Service/httpService";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
const PRODUCTS_URL = `${API_BASE}/products`;

export const createProduct = async (product) => {
  const response = await httpService.post(PRODUCTS_URL, product);
  return response;
};

export const findAllProducts = async () => {
  const response = await axios.get(PRODUCTS_URL);
  return response.data;
};

export const findProductById = async (productId) => {
  const response = await axios.get(`${PRODUCTS_URL}/${productId}`);
  return response.data;
};

export const searchProductsByTitle = async (searchTerm) => {
  const response = await axios.get(`${PRODUCTS_URL}/search?q=${searchTerm}`);
  return response.data.data;
}

export const getReviewsForProduct = async (productId) => {
  const response = await axios.get(`${PRODUCTS_URL}/${productId}/reviews`);
  return response.data;
};

export const addReviewForProduct = async (productId, review) => {
  const response = await axios.post(`${PRODUCTS_URL}/${productId}/reviews`, {
    review: review,
  });
  return response.data;
};
