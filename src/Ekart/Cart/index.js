import DeleteIcon from "@mui/icons-material/Delete";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {PiSmileySad} from "react-icons/pi";
import {Link, useNavigate} from "react-router-dom";
import CardSummary from "./card-summary";
import {
  getCart,
  removeProductFromCart,
  updateProductQtyInCart,
} from "./service";
import {useAuth} from "../../AuthContext";
import {useIsMount} from "../../Common/helpers";
import {setCartItems} from "./cartReducer";
import {useDispatch, useSelector} from "react-redux";
import {Roles} from "../../Constants/roles";
import SnackbarComponent from "../../Common/snackbar";

function Cart() {
  const { user } = useAuth();
  //const [cartItems, setCartItems] = useState([]);
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const [cartChanged, setCartChanged] = useState(false);
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.userReducer.role);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setSnackBarOpen(false);
  }

  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      dispatch(setCartItems(cartData));
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleRemoveProductFromCart = async (productId) => {
    const response = await removeProductFromCart(productId);
    dispatch(setCartItems(response));
    setCartChanged(true);
    setSnackBarMsg("Product removed from cart");
    setSeverity("success");
    setSnackBarOpen(true);
  };

  useEffect(() => {
    if (cartChanged) {
      fetchCart();
      setCartChanged(false); // Reset cartChanged after initiating the fetch
    }
  }, [cartChanged]);

  useEffect(() => {
    if (user) {
      if (role === Roles.SELLER) {
        navigate("/Unauthorized");
      }
      fetchCart();
    }
  }, [user, role]);

  return (
    <div className="m-2">
      {cartItems.length === 0 && !isMount && (
        <>
          <div className={"fs-2 mt-4"}>
            Your cart is empty <PiSmileySad />
          </div>
          <div className={"fs-5"}>
            Add items from your <Link to={"/Account/Wishlist"}>Wishlist</Link>{" "}
            or browse through the <Link to={"/Home"}>Home</Link> page.
          </div>
        </>
      )}
      {cartItems.length > 0 && !isMount && (
        <>
          <div className={"fs-3"}>Hey {user.firstName}, here's your cart</div>
          <div className={"row"}>
            <div className={"col-9"}>
              <table className="table table-striped table-responsive">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => {
                    const quantityRange = Array.from(
                      { length: (item.product && item.product.stock) || 25 },
                      (_, index) => index + 1
                    );
                    return (
                      <tr key={index}>
                        <td>
                          <Link
                            to={`/Products/${
                              item.product.id
                            }`}
                          >
                            {item.product.title}
                          </Link>
                        </td>
                        <td className={"col-3"}>${item.product.price}</td>
                        <td className={"col-1"}>
                          <FormControl className={"me-3"} color="primary">
                            <InputLabel id="qty">Qty</InputLabel>
                            <Select
                              value={item.quantity}
                              labelId="qty"
                              id="qty-input"
                              label="Quantity"
                              onChange={(e) => {
                                setCartChanged(true);
                                updateProductQtyInCart(item.product._id, {
                                  quantity: e.target.value,
                                });
                              }}
                            >
                              {quantityRange.map((value) => (
                                <MenuItem key={value} value={value}>
                                  {value}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </td>
                        <td className={"col-1"}>
                          <IconButton
                            color="error"
                            onClick={() => {
                              handleRemoveProductFromCart(item.product._id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className={"col-3"}>
              <CardSummary cartItems={cartItems} />
            </div>
          </div>
        </>
      )}
      <SnackbarComponent snackbarOpen={snackbarOpen} snackbarMsg={snackbarMsg}
                         severity={severity} horizontal="center"
                         vertical="top" handleClose={handleSnackbarClose}/>
    </div>
  );
}

export default Cart;
