import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";
const PRODUCTS_URL = `${API_BASE}/products`;

export const findAllProducts = async () => {
  const response = await axios.get(PRODUCTS_URL);
  return response.data.products;
};
