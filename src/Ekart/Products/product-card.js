import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import staticImage from '../Database/product-img.avif';
import ProductDetails from "./product-details";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card id="wd-card" >
        <Link key={product._id} to={`/Products/${product._id}`} style={{ textDecoration: 'none' }}>
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
          <Typography variant="body2" color="text.secondary">
            {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
      <Button className="mb-2" variant="outlined" size="small" color="primary">
        Add to Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
