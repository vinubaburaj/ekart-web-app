import {PRODUCTS} from "../../Constants/apiUrls";
import * as httpService from "../Service/httpService";
import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

const EXTERNAL_API_URL = "https://dummyjson.com/products";

export const createProduct = async (product) => {
  const response = await httpService.post(PRODUCTS, product);
  return response;
};

export const findAllProducts = async () => {
  const response = await httpService.get(PRODUCTS);
  return response;
};

export const findProductById = async (productId) => {
  // allow it to fail if it is a dummy JSON ID that doesn't exist
  const response = await request.get(`${PRODUCTS}/${productId}`);
  return response.data;
};

export const externalFindProductById = async (productId) => {
  // using axios instead of httpservice since we're pinging external API
  const response = await axios.get(`${EXTERNAL_API_URL}/${productId}`);
  return response.data;
};

export const searchProductsByTitle = async (searchTerm) => {
  const response = await httpService.get(`${PRODUCTS}/search?q=${searchTerm}`);
  return response.data;
};

export const searchSellerProductsByTitle = async (sellerId, searchTerm) => {
  const response = await httpService.get(
    `${PRODUCTS}/seller/${sellerId}/search?q=${searchTerm}`
  );
  return response.data;
}

export const getProductsBySeller = async () => {
  const response = await httpService.get(`${PRODUCTS}/seller`);
  return response;
}

export const getReviewsForProduct = async (productId) => {
  const response = await httpService.get(`${PRODUCTS}/${productId}/reviews`);
  return response;
};

export const addReviewForProduct = async (product, review) => {
  const response = await httpService.post(`${PRODUCTS}/${product.id}/reviews`, {
    product: product,
    review: review,
  });
  return response;
};

export const updateProduct = async (productId, product) => {
  const response = await httpService.put(`${PRODUCTS}/seller/${productId}`, product);
  return response;
}

export const deleteProduct = async (productId) => {
  const response = await httpService.deleteReq(`${PRODUCTS}/seller/${productId}`);
  return response;
};
