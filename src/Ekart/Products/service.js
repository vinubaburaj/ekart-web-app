import {PRODUCTS} from "../../Constants/apiUrls";
import * as httpService from "../Service/httpService";
import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

const EXTERNAL_API_URL = "https://dummyjson.com/products";

export const createProduct = async (product) => {
  return await httpService.post(PRODUCTS, product);
};

export const findAllProducts = async () => {
  return await httpService.get(PRODUCTS);
};

export const findRandomProducts = async (navigate) => {
  return await httpService.get(`${PRODUCTS}/random`, navigate);
}

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
  return await httpService.get(`${PRODUCTS}/seller`);
}

export const getReviewsForProduct = async (productId) => {
  return await httpService.get(`${PRODUCTS}/${productId}/reviews`);
};

export const addReviewForProduct = async (product, review) => {
  return await httpService.post(`${PRODUCTS}/${product.id}/reviews`, {
    product: product,
    review: review,
  });
};

export const updateProduct = async (productId, product) => {
  return await httpService.put(`${PRODUCTS}/seller/${productId}`, product);
}

export const deleteProduct = async (productId) => {
  return await httpService.deleteReq(`${PRODUCTS}/seller/${productId}`);
};
