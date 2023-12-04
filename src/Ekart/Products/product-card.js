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
import {addProductToCart} from "../Cart/cartReducer";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {FaRegHeart} from "react-icons/fa";
import {FaHeart} from "react-icons/fa6";
import {useLocation} from "react-router";
import {
  addProductToWishlist,
  deleteProductFromWishlist
} from "../Wishlist/wishlistReducer";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductCard = ({product}) => {
  const dispatch = useDispatch();
  const url = useLocation().pathname;
  const isWishlist = url.indexOf("Wishlist") !== -1;
  const [wishListed, setWishListed] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const ratingValue = product.rating;
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

  const toggleCart = () => {
    setAddedToCart(!addedToCart);
    setSnackBarOpen(true);
    if (!addedToCart) {
      dispatch(addProductToCart({
        quantity: 1,
        product: product,
      }));
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
            to={`/Products/${product.id || product._id}`}
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
                ({ratingValue})
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
              {!addedToCart && (
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
              {addedToCart && (
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
              {!wishListed && (
                  <FaRegHeart
                      onClick={toggleWishList}
                      title={"Add to WishList"}
                      className={"wd-cursor-pointer wd-primary-color align-self-center"}
                  />
              )}
              {wishListed && (
                  <FaHeart
                      onClick={toggleWishList}
                      title={"Remove from WishList"}
                      className={"wd-cursor-pointer wd-primary-color align-self-center"}
                  />
              )}
            </div>)}
        {isWishlist && (
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
      </Card>
  );
};

export default ProductCard;
