import {useParams} from "react-router";
import db from "../Database";
import staticImage from "../Database/product-img.avif";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select
} from "@mui/material";
import {FaRegHeart} from "react-icons/fa";
import {FaHeart} from "react-icons/fa6";
import React, {useState} from "react";
import {addProductToCart} from "../Cart/cartReducer";
import {useDispatch} from "react-redux";

function ProductDetails() {
  const dispatch = useDispatch();
  const {productId} = useParams();
  const [quantity, setQuantity] = useState(1);
  const product = db.products.find((p) => p._id === parseInt(productId));
  const ratingValue = product.rating;
  const [wishListed, setWishListed] = useState(false);
  const toggleWishList = () => {
    setWishListed(!wishListed);
  };
  const addToCart = () => {
    dispatch(addProductToCart({
      quantity: quantity,
      product: product
    }));
  }
  return (
      <>
        <div className={"d-flex align-items-start mt-3 ms-2"}>
          <h4>Products Details</h4>
        </div>
        <hr className={"mt-1"}/>
        <div className={"row mx-3"}>
          <div className={"col-3"}>
            <img src={staticImage} width={250} height={250} alt={"prod_image"}/>
          </div>
          <div className={"col-9"}>
            <div className={"d-flex flex-row"}>
              <div className="fs-2">{product.name}</div>
              {!wishListed && (
                  <FaRegHeart
                      onClick={toggleWishList}
                      title={"Add to WishList"}
                      className={
                        "wd-cursor-pointer wd-primary-color align-self-center ms-2"
                      }
                  />
              )}
              {wishListed && (
                  <FaHeart
                      onClick={toggleWishList}
                      title={"Remove from WishList"}
                      className={
                        "wd-cursor-pointer wd-primary-color align-self-center ms-2"
                      }
                  />
              )}
            </div>
            <div className={"d-flex flex-row"}>
              <Rating
                  readOnly
                  name="read-only"
                  value={ratingValue}
                  precision={0.5}
              />
              ({ratingValue})
            </div>
            <h4 className="mt-2">{product.price}</h4>
            <div className={"d-flex flex-row mt-5"}>
              <FormControl className={'me-3'} color={'primary'}>
                <InputLabel id="qty">Qty</InputLabel>
                <Select
                    labelId="qty"
                    id="qty-input"
                    label="Quantity"
                    defaultValue={1}
                    onChange={(e) => setQuantity(e.target.value)}>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                </Select>
              </FormControl>
              <Button variant="outlined" size="small" color="primary"
                      onClick={addToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </>
  );
}

export default ProductDetails;
