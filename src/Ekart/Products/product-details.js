import {useParams} from "react-router";
import db from "../Database";
import staticImage from '../Database/product-img.avif'
import {Button, Rating} from "@mui/material";
import {FaRegHeart} from "react-icons/fa";
import {FaHeart} from "react-icons/fa6";
import React, {useState} from "react";

function ProductDetails() {
  const {productId} = useParams();
  console.log(productId);
  const product = db.products.find((p) => p._id === parseInt(productId));
  const ratingValue = product.rating;
  const [wishListed, setWishListed] = useState(false);
  const toggleWishList = () => {
    setWishListed(!wishListed);
  }
  return (
      <>
        <div className={'d-flex align-items-start mt-3 ms-2'}>
          <h4>Products Details</h4>
        </div>
        <hr className={'mt-1'}/>
        <div className={'row mx-3'}>
          <div className={'col-3'}>
            <img src={staticImage} width={250} height={250} alt={'prod_image'}/>
          </div>
          <div className={'col-9'}>
            <h3 className="mt-2">{product.name}</h3>
            <div className={'d-flex flex-row'}>
              <Rating
                  readOnly
                  name="read-only"
                  value={ratingValue}
                  precision={0.5}
              />
              ({ratingValue})
            </div>
            <h4 className="mt-2">{product.price}</h4>
            <div className={'d-flex flex-row'}>
              <Button variant="outlined" size="small"
                      color="primary">
                Add to Cart
              </Button>
              {!wishListed && <FaRegHeart onClick={toggleWishList}
                                          title={'Add to WishList'}
                                          className={'wd-cursor-pointer primary-color align-self-center ms-2'}/>}
              {wishListed && <FaHeart onClick={toggleWishList}
                                      title={'Remove from WishList'}
                                      className={'wd-cursor-pointer primary-color align-self-center ms-2'}/>}
            </div>
          </div>
        </div>
      </>
  );
}

export default ProductDetails;
