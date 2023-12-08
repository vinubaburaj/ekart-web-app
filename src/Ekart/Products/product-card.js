import React, {useState} from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
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

const ProductCard = ({product, wishlistItems, user}) => {
  const url = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState(wishlistItems);
  const isWishlist = url.indexOf("Wishlist") !== -1;
  const [addedToCart, setAddedToCart] = useState(false);
  const ratingValue = product?.rating;
  const [wishListed, setWishListed] = useState(
      wishlist.some((item) => item.id === product.id));
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState('success');
  const role = useSelector((state) => state.userReducer.role);
  const [isSeller, setIsSeller] = useState(role === Roles.SELLER);
  const [dialogOpen, setDialogOpen] = useState(false);

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
    dispatch(deleteFromSellerProducts(product.id));
  }

  const deleteProductClicked = () => {
    setDialogOpen(true);
  }

  const toggleWishList = () => {
    if (user) {
      if (!wishListed) {
        addingToWishlist();
      } else {
        removingFromWishlist();
      }
      setWishListed(!wishListed);
    } else {
      navigate("/Login");
    }
  };

  const addingToWishlist = async () => {
    const res = await wishlistService.addToWishlist(product);
    if (res?.status === 400) {
      setSnackBarMessage("Already in WishList!");
      setSnackBarSeverity("error");
      setSnackBarOpen(true);
      return;
    }
    setSnackBarMessage("Added to WishList!");
    setSnackBarSeverity("success");
    setSnackBarOpen(true);
  }

  const removingFromWishlist = async () => {
    const res = await wishlistService.removeFromWishlist(product.id);
    if (res?.status === 400) {
      setSnackBarMessage("Not in WishList!");
      setSnackBarSeverity("error");
      setSnackBarOpen(true);
      return;
    }
    setSnackBarMessage("Removed from WishList!");
    setSnackBarSeverity("success");
    setSnackBarOpen(true);
  }

  const toggleCart = async () => {
    setAddedToCart(!addedToCart);
    setSnackBarOpen(true);
    if (!addedToCart) {
      const response = await addToCart(product, 1);
      dispatch(setCartItems(response))
    }
    setSnackBarMessage(addedToCart ? "Removed from Cart" : "Added to Cart");
  };

  const moveToCart = () => {
    const res = wishlistService.moveToCart(product.id);
    setWishlist(res);
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
              <div className={"d-flex flex-row align-items-center mb-2"}>
                <Rating
                    size={"small"}
                    readOnly
                    name="read-only"
                    value={ratingValue}
                    precision={0.5}
                />
                ({ratingValue ? ratingValue : "No Ratings"})
              </div>
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
              <IconButton
                  color="error"
                  onClick={removingFromWishlist}>
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
        <SnackbarComponent snackbarOpen={snackBarOpen}
                           severity={snackBarSeverity}
                           snackbarMsg={snackBarMessage} horizontal="center"
                           vertical="top"/>
        <SimpleConfirmDialog open={dialogOpen} onClose={handleDialogClose} />
      </Card>
  );
};

SimpleConfirmDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};


export default ProductCard;
