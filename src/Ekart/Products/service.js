import axios from "axios";

export const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
export const PRODUCTS_URL = `${API_BASE}/products`;

export const findAllProducts = async () => {
  const response = await axios.get(PRODUCTS_URL);
  return response.data.products;
};

export const findProductById = async (productId) => {
    const response = await axios.get(`${PRODUCTS_URL}/${productId}`);
    return response.data;
}

export const searchProductsByTitle = async (searchTerm) => {
  const response = await axios.get(`${PRODUCTS_URL}/search?q=${searchTerm}`);
  // console.log(response.data.data.products);
  return response.data.data.products;
}
