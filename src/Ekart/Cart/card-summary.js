import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { emptyCart } from "./service";

function CardSummary({ cartItems, setCartItems }) {
  const handleEmptyCart = () => {
    emptyCart();
    setCartItems([]);
  };
  const shipping = 5.0;
  let totalPrice = 0;
  let totalQuantity = 0;
  cartItems.forEach((item) => {
    totalPrice += item.product.price * item.quantity;
    totalQuantity += item.quantity;
  });
  totalPrice = totalPrice.toFixed(2);
  console.log("price: ", totalPrice);
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Order Summary
          </Typography>
          <div className={"row mt-3"}>
            <div className={"col-6"}>
              <Typography variant="body2">Total Items:</Typography>
            </div>
            <div className={"col-6"}>
              <Typography variant="body2" align="right">
                {totalQuantity}
              </Typography>
            </div>
          </div>
          <div className={"row"}>
            <div className={"col-6"}>
              <Typography variant="body2">Total Price:</Typography>
            </div>
            <div className={"col-6"}>
              <Typography variant="body2" align="right">
                ${totalPrice}
              </Typography>
            </div>
          </div>
          <div className={"row"}>
            <div className={"col-8"}>
              <Typography variant="body2">Shipping and handling:</Typography>
            </div>
            <div className={"col-4"}>
              <Typography variant="body2" align="right">
                ${shipping.toFixed(2)}
              </Typography>
            </div>
          </div>
          <hr />
          <div className={"row"}>
            <div className={"col-8"}>
              <Typography variant="h6" color="error">
                Order total:
              </Typography>
            </div>
            <div className={"col-4"}>
              <Typography variant="h6" color="error" align="right">
                ${(parseFloat(totalPrice) + shipping).toFixed(2)}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        className="d-block mt-2 w-100"
      >
        Place Order
      </Button>
      <Button
        variant="contained"
        className="mt-2 d-block w-100"
        color="error"
        onClick={handleEmptyCart}
      >
        Empty Cart
      </Button>
    </>
  );
}

export default CardSummary;
