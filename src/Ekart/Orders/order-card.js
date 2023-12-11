import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
};

const cardContentStyle = {
  flexGrow: 1,
};

const productThumbnailStyle = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "cover",
};

const OrderCard = ({ order }) => {
  const renderProductThumbnails = (products) => {
    const MAX_THUMBNAILS = 2;
    const productThumbnails = products
      .slice(0, MAX_THUMBNAILS)
      .map((product) => (
        <CardMedia
          key={product.product._id}
          component="img"
          alt={product.product.title}
          src={product.product.thumbnail}
          style={productThumbnailStyle}
        />
      ));

    const remainingProductsCount = products.length - MAX_THUMBNAILS;
    if (remainingProductsCount > 0) {
      productThumbnails.push(
        <Typography key="moreProducts" variant="body2" color="textSecondary">
          +{remainingProductsCount} more
        </Typography>
      );
    }

    return productThumbnails;
  };

  return (
    <Card style={cardStyle}>
      <CardContent style={cardContentStyle}>
        <Typography variant="h6" component="div" gutterBottom>
          Order Date: {new Date(order.orderDate).toLocaleString()}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Total Amount: ${order.totalAmount.toFixed(2)}
        </Typography>
        {renderProductThumbnails(order.products)}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
