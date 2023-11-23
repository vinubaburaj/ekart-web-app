import React, {useState} from "react";
import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Snackbar,
  Typography,
  Button,
} from "@mui/material";
import staticImage from '../Database/product-img.avif';
import { addProductToCart } from '../Cart/cartReducer';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {FaRegHeart} from "react-icons/fa";
import {FaHeart} from "react-icons/fa6";

const ProductCard = ({product}) => {
  const dispatch = useDispatch();
  const [wishListed, setWishListed] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const ratingValue = product.rating;
  const toggleWishList = () => {
    setWishListed(!wishListed);
    setSnackBarOpen(true);
    setSnackBarMessage(
        wishListed ? 'Removed from WishList' : 'Added to WishList');
  }

  const toggleCart = () => {
    setAddedToCart(!addedToCart);
    setSnackBarOpen(true);
    if (!addedToCart) {
      dispatch(addProductToCart(product));
    }
    setSnackBarMessage(addedToCart ? 'Removed from Cart' : 'Added to Cart');
  }

  return (
      <Card className={'wd-card'}>
        <Link key={product._id} to={`/Products/${product._id}`}
              style={{textDecoration: 'none'}}>
          <CardActionArea>
            <CardMedia
                component="img"
                alt={product.name}
                height="140"
                image={staticImage}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <div className={'d-flex flex-row align-items-center mb-2'}>
                <Rating
                    size={'small'}
                    readOnly
                    name="read-only"
                    value={ratingValue}
                    precision={0.5}
                />
                ({ratingValue})
              </div>
              <Typography variant="body2" color="text.secondary">
                {product.price}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <div
            className={'px-3 d-flex justify-content-between align-self-center mb-3'}>
          {!addedToCart && <Button className="mb-0" variant="outlined"
                                   size="small"
                                   color="primary" onClick={() => {toggleCart}>
            Add to Cart
          </Button>}
          {addedToCart && <Button className="mb-0 wd-in-cart" variant="outlined"
                                  size="small"
                                  color="primary" onClick={toggleCart}>
            Remove from cart
          </Button>}
          {!wishListed && <FaRegHeart onClick={toggleWishList}
                                      title={'Add to WishList'}
                                      className={'wd-cursor-pointer primary-color align-self-center'}/>}
          {wishListed && <FaHeart onClick={toggleWishList}
                                  title={'Remove from WishList'}
                                  className={'wd-cursor-pointer primary-color align-self-center'}/>}
        </div>
        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                  open={snackBarOpen}
                  transitionDuration={300} autoHideDuration={2500}
                  onClose={() => setSnackBarOpen(false)}>
          <Alert onClose={() => setSnackBarOpen(false)} severity="success">
            {snackBarMessage}
          </Alert>
        </Snackbar>
      </Card>
  );
};

export default ProductCard;
