import {PRODUCTS} from "../../Constants/apiUrls";
import * as httpService from "../Service/httpService";

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
  const response = await httpService.get(`${PRODUCTS}/${productId}`);
  return response;
};

export const externalFindProductById = async (productId) => {
  const response = await httpService.get(`${EXTERNAL_API_URL}/${productId}`);
  return response.data;
};

export const searchProductsByTitle = async (searchTerm) => {
  const response = await httpService.get(`${PRODUCTS}/search?q=${searchTerm}`);
  return response.data.products;
};

export const getReviewsForProduct = async (productId) => {
  const response = await httpService.get(`${PRODUCTS}/${productId}/reviews`);
  return response;
};

export const addReviewForProduct = async (productId, review) => {
  const response = await httpService.post(`${PRODUCTS}/${productId}/reviews`, {
    review: review,
  });
  return response;
};
