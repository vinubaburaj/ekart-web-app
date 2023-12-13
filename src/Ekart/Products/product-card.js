import React, {useEffect, useState} from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import {setCartItems} from "../Cart/cartReducer";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FaRegHeart} from "react-icons/fa";
import {FaHeart} from "react-icons/fa6";
import {useLocation} from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import {addToCart} from "../Cart/service";
import {Roles} from "../../Constants/roles";
import {Delete, Edit} from "@mui/icons-material";
import SimpleConfirmDialog from "../../Common/SimpleConfirmDialog";
import PropTypes from "prop-types";
import {deleteProduct} from "./service";
import {deleteFromSellerProducts} from "../Seller/sellerProductsReducer";
import SnackbarComponent from "../../Common/snackbar";
import * as wishlistService from "../Wishlist/wishlistService";
import {setWishlistItems} from "../Wishlist/wishlistReducer";

const ProductCard = ({product}) => {
  const dispatch = useDispatch();
  const url = useLocation().pathname;
  const isWishlist = url.indexOf("Wishlist") !== -1;
  const [addedToCart, setAddedToCart] = useState(false);
  const ratingValue = product.rating;
  const role = useSelector((state) => state.userReducer.role);
  const [isSeller, setIsSeller] = useState(role === Roles.SELLER);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState("");
  const [severity, setSeverity] = useState("success");
  const wishlistItems = useSelector(
      (state) => state.wishlistReducer.wishlistItems);
  const user = useSelector((state) => state.userReducer.currentUser);
  const [wishListed, setWishListed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setWishListed(wishlistItems?.some((item) => item.product.id === product.id));
  }, [wishlistItems]);

  const handleSnackbarClose = () => {
    setSnackBarOpen(false);
  }

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
      setSnackBarMsg("Error in deleting product");
      setSeverity("error");
      setSnackBarOpen(true);
      return;
    }
    dispatch(deleteFromSellerProducts(product.id));
    setSnackBarMsg("Product deleted");
    setSeverity("success");
    setSnackBarOpen(true);
  }

  const deleteProductClicked = () => {
    setDialogOpen(true);
  }

  const toggleCart = async () => {
    setAddedToCart(!addedToCart);
    if (!addedToCart) {
      const response = await addToCart(product, 1);
      dispatch(setCartItems(response))
    }
    setSnackBarMsg("Added to Cart");
    setSnackBarOpen(true);
  };

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
    if (res?.status === 403) {
      setSnackBarMsg("Not in WishList!");
      setSeverity("error");
      setSnackBarOpen(true);
      return;
    }
    dispatch(setWishlistItems(res));
    setWishListed(false);
    setSnackBarMsg("Removed from WishList!");
    setSeverity("success");
    setSnackBarOpen(true);
  }

  const moveToCart = async () => {
    const response = await wishlistService.moveProductToCart(product.id);
    if (response?.status === 500) {
      navigate("/Error");
      return;
    }
    dispatch(setCartItems(response.cart));
    dispatch(setWishlistItems(response.wishlist));
    setSnackBarMsg("Moved to Cart!");
    setSeverity("success");
    setSnackBarOpen(true);
  }

  return (
      <Card className={"wd-card"}>
        <Link
            key={product.id}
            to={`/Products/${product.id}`}
            style={{textDecoration: "none"}}
        >
          <CardActionArea>
            <CardMedia
                component="img"
                alt={"Image Unavailable"}
                height="140"
                image={product.thumbnail}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {product.title}
              </Typography>
              {/*<div className={"d-flex flex-row align-items-center mb-2"}>
                <Rating
                    size={"small"}
                    readOnly
                    name="read-only"
                    value={ratingValue}
                    precision={0.5}
                />
                ({ratingValue ? ratingValue : "No Ratings"})
              </div>*/}
              <Typography variant="body2" color="text.secondary">
                ${product.price}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        {!isWishlist && (
            <div
                className={"px-3 d-flex justify-content-between align-self-center mb-3"}
            >
              {!addedToCart && !isSeller && (
                  <Button
                      className="mb-0"
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={toggleCart}
                  >
                    Add to Cart
                  </Button>
              )}
              {addedToCart && !isSeller && (
                  <Button
                      className="mb-0 wd-in-cart"
                      variant="outlined"
                      size="small"
                      color="primary"
                      disabled
                  >
                    In Cart
                  </Button>
              )}
              {!wishListed && !isSeller && (
                  <FaRegHeart
                      onClick={toggleWishList}
                      title={"Add to WishList"}
                      className={"wd-cursor-pointer wd-primary-color align-self-center"}
                  />
              )}
              {wishListed && !isSeller && (
                  <FaHeart
                      onClick={toggleWishList}
                      title={"Remove from WishList"}
                      className={"wd-cursor-pointer wd-primary-color align-self-center"}
                  />
              )}
            </div>)}
        {isWishlist && !isSeller && (
            <div
                className={"px-3 d-flex justify-content-between align-self-center mb-3"}>
              <Button
                  className="mb-0"
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={moveToCart}
              >
                Move to Cart
              </Button>
              <IconButton onClick={removingFromWishlist}
                  color="error">
                <DeleteIcon/>
              </IconButton>
            </div>
        )}
        {isSeller && (
            <div
                className={"px-3 d-flex justify-content-between align-self-center mb-3"}>
              <Link to={`/EditProduct/${product.id}`}><IconButton
                  color={'warning'}>
                <Edit/>
              </IconButton></Link>
              <IconButton color={'error'} onClick={deleteProductClicked}>
                <Delete/>
              </IconButton>
            </div>
        )}
        <SnackbarComponent snackbarOpen={snackbarOpen} snackbarMsg={snackbarMsg}
                           severity={severity} horizontal="center"
                           vertical="top" handleClose={handleSnackbarClose}/>
        <SimpleConfirmDialog open={dialogOpen} onClose={handleDialogClose}/>
      </Card>
  );
};

SimpleConfirmDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default ProductCard;
