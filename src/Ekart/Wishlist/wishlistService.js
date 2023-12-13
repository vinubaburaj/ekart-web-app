import * as httpService from "../Service/httpService";
import {WISHLIST} from "../../Constants/apiUrls";

export const getWishlist = async () => {
  const response = await httpService.get(WISHLIST);
  return response.wishlist;
}

export const addProductToWishlist = async (product) => {
  /*const createProdResp = await createProduct(productId);
  if (createProdResp.status === 404) {
    return createProdResp;
  }*/
  const response = await httpService.post(WISHLIST, product);
  return response.wishlist;
}

export const deleteProductFromWishlist = async (productId) => {
  const response = await httpService.deleteReq(`${WISHLIST}/${productId}`);
  return response.wishlist;
}

export const emptyWishlist = async () => {
  return await httpService.deleteReq(`${WISHLIST}`);
}

export const moveAllProductsToCart = async () => {
  return await httpService.put(`${WISHLIST}`);
}

export const moveProductToCart = async (productId) => {
  return await httpService.put(`${WISHLIST}/${productId}`);
}