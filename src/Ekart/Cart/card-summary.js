import {Button, Card, CardContent, Typography} from "@mui/material";
import React, {useState} from "react";
import {emptyCart} from "./service";
import {createOrder} from "../Orders/service";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCartItems} from "./cartReducer";
import SnackbarComponent from "../../Common/snackbar";

function CardSummary({ cartItems }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState("");
  const [severity, setSeverity] = useState("success");
  const handleEmptyCart = async () => {
    await emptyCart();
    dispatch(setCartItems([]));
    setSnackBarMsg("Cart emptied");
    setSeverity("success");
    setSnackBarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackBarOpen(false);
  }
  const shipping = 5.0;
  let totalPrice = 0;
  let totalQuantity = 0;
  cartItems.forEach((item) => {
    totalPrice += item.product.price * item.quantity;
    totalQuantity += item.quantity;
  });
  totalPrice = totalPrice.toFixed(2);
  console.log("price: ", totalPrice);

  const handlePlaceOrder = async () => {
    // Prepare the payload
    const orderPayload = {
      products: cartItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
    };

    // Create the order
    const createdOrder = await createOrder(orderPayload);
    console.log("CREATED ORDER: ", createdOrder);

    // Redirect to order details
    const orderDetailsUrl = `/Account/Orders/${createdOrder._id}`;
    navigate(orderDetailsUrl);
  };

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
        onClick={handlePlaceOrder}
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
      <SnackbarComponent snackbarOpen={snackbarOpen} snackbarMsg={snackbarMsg}
                         severity={severity} horizontal="center"
                         vertical="top" handleClose={handleSnackbarClose}/>
    </>
  );
}

export default CardSummary;
