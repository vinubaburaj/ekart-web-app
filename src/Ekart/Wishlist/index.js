import {useDispatch, useSelector} from "react-redux";
import ProductCard from "../Products/product-card";
import {Button} from "@mui/material";
import React, {useEffect} from "react";
import {setCartItems} from "../Cart/cartReducer";
import {setWishlistItems} from "./wishlistReducer";
import * as wishlistService from "./wishlistService";
import {useNavigate} from "react-router-dom";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector(
      (state) => state.wishlistReducer.wishlistItems);

  useEffect(() => {
    getWishlistItems();
  }, []);

  const getWishlistItems = async () => {
    const fetchedWishlistItems = await wishlistService.getWishlist()
    dispatch(setWishlistItems(fetchedWishlistItems));
  }

  const moveAllToCart = async () => {
    const response = await wishlistService.moveAllProductsToCart();
    if (response.status === 403) {
      // TODO: Show error message in error component
      navigate('/Error', {state: {message: response.data.message}});
    }
    dispatch(setWishlistItems(response.wishlist));
    dispatch(setCartItems(response.cart));
  }

  const clearWishlist = async () => {
    const response = await wishlistService.emptyWishlist();
    if (response.status === 403) {
      // TODO: Show error message in error component
      navigate('/Error', {state: {message: response.data.message}});
    }
    dispatch(setWishlistItems(response.wishlist));
    dispatch(setCartItems(response.cart));
  }

  return (
      <div className={'m-3'}>
        {wishlistItems.length === 0 && <>
          <div className={'fs-2'}>
            Your wishlist is empty!
          </div>
        </>}
        {wishlistItems.length > 0 && <>
          <div className={'row ms-2'}>
            <div className={'col-2'}>
              <div className={'fs-3'}>Items in Wishlist</div>
            </div>
            <div className={'col-2'}>
              <Button variant="contained" color="primary"
                      className="d-block w-100"
                      onClick={moveAllToCart}>
                Move All to Cart
              </Button>
            </div>
            <div className={'col-2'}>
              <Button
                  variant="contained"
                  className="d-block w-100"
                  color="error"
                  onClick={clearWishlist}
              >
                Clear Wishlist
              </Button>
            </div>
          </div>
          <div className="row mt-3">
            {wishlistItems.map((item, index) => (
                <div className="col col-sm-6 col-md-4 col-lg-3 mb-3"
                     key={index}>
                  <ProductCard product={item.product}/>
                </div>
            ))}
          </div>
        </>}
      </div>
  );
}

export default Wishlist;