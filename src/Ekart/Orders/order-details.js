import React from "react";
import { Typography, Paper, Grid, Button } from "@mui/material";

function OrderDetails({ order }) {
  // Extract necessary information from the order prop
  const { _id, orderDate, totalAmount, products } = order;

  const paperStyle = {
    marginTop: "16px",
    padding: "16px",
  };

  const sidebarStyle = {
    marginLeft: "16px",
  };

  const downloadButtonStyle = {
    marginTop: "16px",
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log("Downloading order details...");
  };

  return (
    <div>
      <Typography variant="h5" component="div" gutterBottom>
        Order Details - {_id}
      </Typography>
      {/* Display order date, total amount, and other relevant information */}
      <Typography variant="body2" gutterBottom>
        Order Date:{" "}
        {new Date(orderDate).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </Typography>
      <Typography variant="body2">
        Total Amount: ${totalAmount.toFixed(2)}
      </Typography>

      {/* Display receipt-like summary for each product in the order */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {/* Main content area */}
          {products.map((product) => (
            <Paper key={product._id} style={paperStyle} elevation={3}>
              <Typography variant="h6">{product.product.title}</Typography>
              <Typography variant="body2">
                Quantity: {product.quantity}
              </Typography>
              <Typography variant="body2">
                Price: ${product.product.price.toFixed(2)}
              </Typography>
              {/* Add more details as needed */}
            </Paper>
          ))}
        </Grid>
        <Grid item xs={12} md={4} style={sidebarStyle}>
          {/* Sidebar for receipt-like summary */}
          <Paper style={paperStyle} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Receipt
            </Typography>
            {products.map((product) => (
              <div key={product._id}>
                <Typography variant="body2">{product.product.title}</Typography>
                <Typography variant="body2">
                  Quantity: {product.quantity} x $
                  {product.product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  Subtotal: $
                  {(product.quantity * product.product.price).toFixed(2)}
                </Typography>
                {/* Add more details as needed */}
                <hr />
              </div>
            ))}
            <Typography variant="body1" align="right" gutterBottom>
              Total: ${totalAmount.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Download button */}
      <Button
        variant="contained"
        color="primary"
        style={downloadButtonStyle}
        onClick={handleDownload}
      >
        Download Order Details
      </Button>
    </div>
  );
}

export default OrderDetails;
