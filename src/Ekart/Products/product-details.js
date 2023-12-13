import {useParams} from "react-router";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {FaRegHeart} from "react-icons/fa";
import {FaHeart} from "react-icons/fa6";
import React, {useEffect, useState} from "react";
import {setCartItems} from "../Cart/cartReducer";
import {useDispatch, useSelector} from "react-redux";
import * as service from "./service";
import {deleteProduct} from "./service";
import Carousel from "react-material-ui-carousel";
import {addToCart as addToCartService} from "../Cart/service";
import {useAuth} from "../../AuthContext";
import {Roles} from "../../Constants/roles";
import {Link, useNavigate} from "react-router-dom";
import SimpleConfirmDialog from "../../Common/SimpleConfirmDialog";
import PropTypes from "prop-types";
import * as wishlistService from "../Wishlist/wishlistService";
import SnackbarComponent from "../../Common/snackbar";

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {productId} = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [wishListed, setWishListed] = useState(false);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const {user} = useAuth();
  const role = useSelector((state) => state.userReducer.role);
  const [isSeller, setIsSeller] = useState(role === Roles.SELLER);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState("");
  const [severity, setSeverity] = useState("success");
  const wishlistItems = useSelector(
      (state) => state.wishlistReducer.wishlistItems);

  useEffect(() => {
    setWishListed(wishlistItems.some((item) => item.product.id === product.id));
  }, [wishlistItems]);

  const handleSnackbarClose = () => {
    setSnackBarOpen(false);
  }

  const toggleWishList = () => {
    if (user) {
      if (!wishListed) {
        addingToWishlist();
      } else {
        removingFromWishlist();
      }
    } else {
      navigate("/Login");
    }
  };

  const addingToWishlist = async () => {
    const res = await wishlistService.addProductToWishlist(product);
    if (res?.status === 500) {
      navigate("/Error");
    }
    if (res?.status === 403) {
      setSnackBarMsg("Already in WishList!");
      setSeverity("error");
      setSnackBarOpen(true);
      return;
    }
    setWishListed(true);
    setSnackBarMsg("Added to WishList!");
    setSeverity("success");
    setSnackBarOpen(true);
  }

  const removingFromWishlist = async () => {
    const res = await wishlistService.deleteProductFromWishlist(product.id);
    if (res?.status === 500) {
      navigate("/Error");
    }
    if (res?.status === 403) {
      setSnackBarMsg("Not in WishList!");
      setSeverity("error");
      setSnackBarOpen(true);
      return;
    }
    setWishListed(false);
    setSnackBarMsg("Removed from WishList!");
    setSeverity("success");
    setSnackBarOpen(true);
  }
  const addToCart = async () => {
    const response = await addToCartService(product, quantity);
    dispatch(setCartItems(response));
    setSnackBarMsg("Added to Cart");
    setSnackBarOpen(true);
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
    const addedReview = await service.addReviewForProduct(product, review);
    setReviews([addedReview, ...reviews]);
    setReview("");
  };

  const fetchProductReviews = async () => {
    const fetchedReviews = await service.getReviewsForProduct(productId);
    setReviews(fetchedReviews);
  };

  const handleDialogClose = (value) => {
    console.log(value);
    setDialogOpen(false);
    if (value) {
      deleteProdFromDB();
    }
  }

  const deleteProdFromDB = async () => {
    const response = await deleteProduct(product.id);
    if (response.status) {
      // TODO: Show error message
      return;
    }
    navigate("/Products");
  }

  const deleteProductClicked = () => {
    setDialogOpen(true);
  }

  useEffect(() => {
    fetchProduct();
    fetchProductReviews();
    setIsSeller(role === Roles.SELLER)
  }, [productId, role]);

  return (
      <>
        {product && (
            <>
              <div className={"d-flex align-items-start mt-3 ms-2"}>
                <h4>Product Details</h4>
              </div>
              <hr className={"mt-1"}/>
              <div className={"row mx-3"}>
                <Carousel animation={"slide"} swipe={true} autoPlay={false}>
                  {product.images && !!product.images.length
                      && product.images.map((item) => (
                          <div className={"d-flex justify-content-center"}>
                            <img
                                style={{height: "400px", width: "600px"}}
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
              <hr className={"mt-1"}/>
              <div className={"row mx-3 mb-3"}>
                <div className={"col-9"}>
                  <div className={"d-flex flex-row"}>
                    <div className="fs-2">{product.title}</div>
                    {!isSeller && !wishListed && (
                        <FaRegHeart
                            onClick={toggleWishList}
                            title={"Add to WishList"}
                            className={
                              "wd-cursor-pointer wd-primary-color align-self-center ms-2"
                            }
                        />
                    )}
                    {!isSeller && wishListed && (
                        <FaHeart
                            onClick={toggleWishList}
                            title={"Remove from WishList"}
                            className={
                              "wd-cursor-pointer wd-primary-color align-self-center ms-2"
                            }
                        />
                    )}
                  </div>
                  {/*<div className={"d-flex flex-row"}>
                    <Rating
                        readOnly
                        name="read-only"
                        value={product.rating}
                        precision={0.5}
                    />
                    ({product.rating})
                  </div>*/}
                  <h4 className="mt-2">${product.price}</h4>
                  {!isSeller && <div className={"d-flex flex-row mt-3"}>
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
                  </div>}
                  {isSeller && <div className={"d-flex flex-row mt-3"}>
                    <Link to={`/EditProduct/${product.id}`}>
                      <Button
                          variant="contained"
                          size="small"
                          color="warning"
                          className={'me-3'}>
                        Edit Product
                      </Button></Link>
                    <Button
                        onClick={deleteProductClicked}
                        variant="contained"
                        size="small"
                        color="error">Delete Product</Button>
                  </div>}
                  <div className={"mt-3 fs-3"}>
                    <p className={"mb-0"}>Description</p>
                  </div>
                  <p>{product.description}</p>
                </div>
              </div>
              <hr className={"mt-1"}/>
              <div className="mx-3 mb-5 ps-3">
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
                  {review.length === 0 && (
                      <div className="fs-5">No reviews yet</div>
                  )}
                  {reviews.length > 0 && (
                      <>
                        {/* {JSON.stringify(reviews)} */}
                        <ul className="list-group list-group-flush">
                          {reviews.map((reviewObject) => (
                              <li className="list-group-item">
                                {/* {JSON.stringify(reviewObject)} */}
                                <div
                                    className="fs-5">{reviewObject.review}</div>
                                <div className="small">
                                  <span>By: </span>
                                  <Link
                                      to={`/Account/Profile/${reviewObject?.user?._id}`}>
                                    {reviewObject?.user?.firstName}{" "}
                                    {reviewObject?.user?.lastName}
                                  </Link>
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
        <SnackbarComponent snackbarOpen={snackbarOpen} snackbarMsg={snackbarMsg}
                           severity={severity} horizontal="center"
                           vertical="top" handleClose={handleSnackbarClose}/>
        <SimpleConfirmDialog open={dialogOpen} onClose={handleDialogClose}/>
      </>
  );
}

SimpleConfirmDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default ProductDetails;
