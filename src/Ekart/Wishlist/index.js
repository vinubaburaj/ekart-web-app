import ProductCard from "../Products/product-card";
import {Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import * as wishlistService from "./wishlistService";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([])

  const moveAllToCart = async () => {
    await wishlistService.moveAllToCart();
  }

  const getWishlist = async () => {
    const response = await wishlistService.getWishlist();
    setWishlistItems(response);
  }

  const clearWishlist = async () => {
    const response = await wishlistService.clearWishlist();
    setWishlistItems(response);
  }

  useEffect(() => {
    getWishlist();
  }, []);

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
            {wishlistItems.map((product, index) => (
                <div className="col col-sm-6 col-md-4 col-lg-3 mb-3"
                     key={index}>
                  <ProductCard product={product} wishlistItems={wishlistItems}/>
                </div>
            ))}
          </div>
        </>}
      </div>
  );
}

export default Wishlist;