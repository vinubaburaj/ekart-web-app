import { ORDERS } from "../../Constants/apiUrls";
import * as httpService from "../Service/httpService";
import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

export const findAllOrders = async () => {
  return await httpService.get(ORDERS);
};

export const cancelOrder = async (orderId) => {
  return await httpService.put(`${ORDERS}/${orderId}/cancel`);
};

export const createOrder = async (orders) => {
  return await httpService.post(`${ORDERS}`, orders);
};

export const getOrderDetails = async (orderId) => {
  return await httpService.get(`${ORDERS}/${orderId}`);
};
