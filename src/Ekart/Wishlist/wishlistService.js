import * as httpService from "../Service/httpService";
import {WISHLIST} from "../../Constants/apiUrls";

export const getWishlist = async () => {
  return await httpService.get(WISHLIST);
}
export const addToWishlist = async (product) => {
  return await httpService.post(WISHLIST, product);
}
export const removeFromWishlist = async (productId) => {
  return await httpService.deleteReq(WISHLIST + "/" + productId);
}

export const clearWishlist = async () => {
  return await httpService.deleteReq(WISHLIST);
}

export const moveToCart = async (product) => {
  return await httpService.put(WISHLIST, product);
}

export const moveAllToCart = async () => {
  return await httpService.put(WISHLIST);
}