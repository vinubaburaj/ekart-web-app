import * as httpService from "../Service/httpService";
import {createProduct} from "../Products/service";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
const CART_URL = `${API_BASE}/cart`;

export const addToCart = async (product, quantity) => {
  const productId = product.id;

  // Adding the product in the database. If it already exists, it will just
  // return a 200 response with the message that it exists.
  const createdProduct = await createProduct(product);

  const payload = { productId, quantity };
  const response = await httpService.post(`${CART_URL}/add`, payload);
  return response.cart;
};

export const getCart = async () => {
  const response = await httpService.get(CART_URL);
  return response.cart;
};

export const updateProductQtyInCart = async (productId, quantity) => {
  const response = await httpService.put(`${CART_URL}/${productId}`, quantity);
  return response.cart;
};

export const removeProductFromCart = async (productId) => {
  const response = await httpService.deleteReq(
    `${CART_URL}/remove/${productId}`
  );
  return response.cart;
};

export const emptyCart = async () => {
  const response = await httpService.deleteReq(`${CART_URL}/empty`);
  return response.cart;
};
