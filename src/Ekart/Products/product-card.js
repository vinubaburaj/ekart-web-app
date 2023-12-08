import React, {useState} from "react";
import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Snackbar,
  Typography,
} from "@mui/material";
import {addProductToCart, setCartItems} from "../Cart/cartReducer";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FaRegHeart} from "react-icons/fa";
import {FaHeart} from "react-icons/fa6";
import {useLocation} from "react-router";
import {
  addProductToWishlist,
  deleteProductFromWishlist
} from "../Wishlist/wishlistReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import {addToCart} from "../Cart/service";
import {Roles} from "../../Constants/roles";
import {Delete, Edit} from "@mui/icons-material";
import SimpleConfirmDialog from "../../Common/SimpleConfirmDialog";
import PropTypes from "prop-types";
import {deleteProduct} from "./service";
import {deleteFromSellerProducts} from "../Seller/sellerProductsReducer";

const ProductCard = ({product}) => {
  const dispatch = useDispatch();
  const url = useLocation().pathname;
  const isWishlist = url.indexOf("Wishlist") !== -1;
  const [wishListed, setWishListed] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const ratingValue = product.rating;
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
    setWishListed(!wishListed);
    setSnackBarOpen(true);
    if (!wishListed) {
      dispatch(addProductToWishlist(product));
    } else {
      dispatch(deleteProductFromWishlist(product.id));
    }
    setSnackBarMessage(
        wishListed ? "Removed from WishList" : "Added to WishList",
    );
  };

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
    dispatch(deleteProductFromWishlist(product.id));
    dispatch(addProductToCart({
      quantity: 1,
      product: product,
    }));
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
                  onClick={() => dispatch(
                      deleteProductFromWishlist(product.id))}>
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
        <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            open={snackBarOpen}
            transitionDuration={300}
            autoHideDuration={2500}
            onClose={() => setSnackBarOpen(false)}
        >
          <Alert onClose={() => setSnackBarOpen(false)} severity="success">
            {snackBarMessage}
          </Alert>
        </Snackbar>
        <SimpleConfirmDialog open={dialogOpen} onClose={handleDialogClose} />
      </Card>
  );
};

SimpleConfirmDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};


export default ProductCard;
