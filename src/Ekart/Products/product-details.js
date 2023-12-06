import { useParams } from "react-router";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
} from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { addProductToCart } from "../Cart/cartReducer";
import { useSelector, useDispatch } from "react-redux";
import * as service from "./service";
import Carousel from "react-material-ui-carousel";
import {
  addProductToWishlist,
  deleteProductFromWishlist,
} from "../Wishlist/wishlistReducer";
import { addToCart as addToCartService } from "../Cart/service";
import { useAuth } from "../../AuthContext";

function ProductDetails() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [wishListed, setWishListed] = useState(false);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();

  const toggleWishList = () => {
    setWishListed(!wishListed);
    if (!wishListed) {
      dispatch(addProductToWishlist(product));
    } else {
      dispatch(deleteProductFromWishlist(product.id));
    }
  };
  const addToCart = () => {
    addToCartService(product, 1);
  };

  const fetchProduct = async () => {
    try {
      const fetchedProduct = await service.findProductById(productId);
      setProduct(fetchedProduct);
    } catch (error) {
      console.error("Error fetching product: ", error);
      const externalFetchedProduct = await service.externalFindProductById(
        productId
      );
      setProduct(externalFetchedProduct);
    }
  };

  const handleAddReview = async () => {
    const addedReview = await service.addReviewForProduct(productId, review);
    setReviews([addedReview, ...reviews]);
    setReview("");
  };

  const fetchProductReviews = async () => {
    const fetchedReviews = await service.getReviewsForProduct(productId);
    setReviews(fetchedReviews);
  };

  useEffect(() => {
    fetchProduct();
    fetchProductReviews();
  }, [productId]);

  return (
    <>
      {product && (
        <>
          <div className={"d-flex align-items-start mt-3 ms-2"}>
            <h4>Product Details</h4>
          </div>
          <hr className={"mt-1"} />
          <div className={"row mx-3"}>
            <Carousel animation={"slide"} swipe={true} autoPlay={false}>
              {product.images.map((item) => (
                <div className={"d-flex justify-content-center"}>
                  <img
                    style={{ height: "400px", width: "600px" }}
                    key={item}
                    srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item}?w=248&fit=crop&auto=format`}
                    alt={product.title}
                    loading="lazy"
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <hr className={"mt-1"} />
          <div className={"row mx-3 mb-3"}>
            <div className={"col-9"}>
              <div className={"d-flex flex-row"}>
                <div className="fs-2">{product.title}</div>
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
                  value={product.rating}
                  precision={0.5}
                />
                ({product.rating})
              </div>
              <h4 className="mt-2">${product.price}</h4>
              <div className={"d-flex flex-row mt-3"}>
                <FormControl className={"me-3"} color={"primary"}>
                  <InputLabel id="qty">Qty</InputLabel>
                  <Select
                    labelId="qty"
                    id="qty-input"
                    label="Quantity"
                    defaultValue={1}
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={addToCart}
                >
                  Add to Cart
                </Button>
              </div>
              <div className={"mt-3 fs-3"}>
                <p className={"mb-0"}>Description</p>
              </div>
              <p>{product.description}</p>
            </div>
          </div>
          <hr className={"mt-1"} />
          <div className="mx-3 mb-5">
            <div className="fs-4 mb-3">Reviews</div>
            {user && user.role === "BUYER" && (
              <div className="row">
                <div className="col-6">
                  <textarea
                    id="addReviewForm"
                    className="form-control"
                    rows="3"
                    placeholder="Add a review..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                </div>
                <div className="col-2">
                  <button
                    className="btn btn-primary"
                    disabled={!review}
                    onClick={handleAddReview}
                  >
                    Add Review
                  </button>
                </div>
              </div>
            )}
            <div className="mt-3 ">
              {reviews && (
                <>
                  {/* {JSON.stringify(reviews)} */}
                  <ul className="list-group list-group-flush">
                    {reviews.map((reviewObject) => (
                      <li className="list-group-item">
                        {/* {JSON.stringify(reviewObject)} */}
                        <div className="fs-5">{reviewObject.review}</div>
                        <div className="small">
                          <span>By: </span>
                          {reviewObject.user.firstName}{" "}
                          {reviewObject.user.lastName}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetails;
