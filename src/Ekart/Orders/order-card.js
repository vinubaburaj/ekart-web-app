import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  width: "400px", // Adjust the width as needed
  position: "relative",
  padding: "16px", // Add padding for better separation
  marginBottom: "16px", // Add margin between cards
};

const cardContentStyle = {
  flexGrow: 1,
};

const productThumbnailContainer = {
  display: "flex",
  gap: "8px", // Adjust the gap as needed
  marginBottom: "8px", // Add margin between thumbnails and text
  flexWrap: "wrap", // Allow thumbnails to wrap to the next line if needed
};

const productThumbnailStyle = {
  maxWidth: "60px", // Adjust the thumbnail size as needed
  maxHeight: "60px",
  objectFit: "cover",
};

const cancelledFlagStyle = {
  backgroundColor: "#ffcccc", // Light red background
  color: "red",
  padding: "4px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const OrderCard = ({ order, onCancel }) => {
  const [isCancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);

  const handleCancelConfirmation = () => {
    setCancelConfirmationOpen(true);
  };

  const handleCancelOrder = () => {
    onCancel(order._id);
    setCancelConfirmationOpen(false);
  };

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

    return <div style={productThumbnailContainer}>{productThumbnails}</div>;
  };

  return (
    <Card style={cardStyle}>
      <CardContent style={cardContentStyle}>
        <Typography variant="h6" component="div" gutterBottom>
          Order Date:{" "}
          {new Date(order.orderDate).toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Total Amount: ${order.totalAmount.toFixed(2)}
        </Typography>
        {renderProductThumbnails(order.products)}
      </CardContent>
      {!order.isCancelled && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCancelConfirmation}
        >
          Cancel Order
        </Button>
      )}
      {order.isCancelled && (
        <Typography variant="body2" style={cancelledFlagStyle}>
          CANCELLED
        </Typography>
      )}
      <Dialog
        open={isCancelConfirmationOpen}
        onClose={() => setCancelConfirmationOpen(false)}
      >
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel this order? This cannot be reversed!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setCancelConfirmationOpen(false)}
            color="primary"
          >
            No
          </Button>
          <Button
            onClick={handleCancelOrder}
            style={{ backgroundColor: "#ff3333", color: "white" }}
          >
            Yes, Cancel Order
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default OrderCard;
