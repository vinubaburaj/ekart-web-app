import React, { useState, useEffect } from "react";
import { Typography, Paper, Grid, Button, Box } from "@mui/material";
import { getOrderDetails } from "./service";
import { useParams } from "react-router";

function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderDetails(orderId);
        setOrder(response);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!order) {
    // Loading or error state, you can customize this part
    return <Typography>Loading order details...</Typography>;
  }

  // Extract necessary information from the order prop
  const { _id, orderDate, totalAmount, products } = order;

  const paperStyle = {
    marginTop: "16px",
    padding: "16px",
  };

  const contentStyle = {
    flex: 1,
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box display="flex" maxWidth="1200px" width="100%">
        <div style={contentStyle}>
          <Typography variant="h5" component="div" gutterBottom>
            Order ID - #{_id}
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
            {products.map((product) => (
              <Grid item xs={12} md={8} key={product._id}>
                {/* Main content area */}
                <Paper style={paperStyle} elevation={3}>
                  <Box display="flex" alignItems="center">
                    {/* Thumbnail as an icon */}
                    <img
                      src={product.product.thumbnail}
                      alt={product.product.title}
                      style={{ width: 30, height: 30, marginRight: 10 }}
                    />
                    <div>
                      <Typography variant="h6">
                        {product.product.title}
                      </Typography>
                      <Typography variant="body2">
                        Quantity: {product.quantity}
                      </Typography>
                      <Typography variant="body2">
                        Price: ${product.product.price.toFixed(2)}
                      </Typography>
                    </div>
                  </Box>
                  {/* Add more details as needed */}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>

        <div style={sidebarStyle}>
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
      </Box>
    </Box>
  );
}

export default OrderDetails;
