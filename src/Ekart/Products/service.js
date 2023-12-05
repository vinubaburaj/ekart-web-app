import axios from "axios";
import {PRODUCTS} from "../../Constants/apiUrls";
import * as httpService from "../Service/httpService";

export const findAllProducts = async () => {
  const response = await httpService.get(PRODUCTS);
  return response.products;
};

export const findProductById = async (productId) => {
  const response = await httpService.get(`${PRODUCTS}/${productId}`);
  return response;
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
