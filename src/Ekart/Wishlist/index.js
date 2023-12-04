import {useDispatch, useSelector} from "react-redux";
import ProductCard from "../Products/product-card";
import {Button} from "@mui/material";
import React from "react";
import {deleteProductFromWishlist, emptyWishlist} from "./wishlistReducer";
import {addProductToCart} from "../Cart/cartReducer";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
      (state) => state.wishlistReducer.wishlistItems);

  const moveAllToCart = () => {
    wishlistItems.forEach((product) => {
      dispatch(deleteProductFromWishlist(product.id));
      dispatch(addProductToCart({
        quantity: 1,
        product: product,
      }));
    });
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
                  onClick={() => dispatch(emptyWishlist())}
              >
                Clear Wishlist
              </Button>
            </div>
          </div>
          <div className="row mt-3">
            {wishlistItems.map((product, index) => (
                <div className="col col-sm-6 col-md-4 col-lg-3 mb-3"
                     key={index}>
                  <ProductCard product={product}/>
                </div>
            ))}
          </div>
        </>}
      </div>
  );
}

export default Wishlist;