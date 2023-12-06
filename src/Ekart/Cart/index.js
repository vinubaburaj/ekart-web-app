import DeleteIcon from "@mui/icons-material/Delete";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { PiSmileySad } from "react-icons/pi";
import { Link } from "react-router-dom";
import CardSummary from "./card-summary";
import {
  getCart,
  updateProductQtyInCart,
  removeProductFromCart,
} from "./service";
import { useAuth } from "../../AuthContext";

function Cart() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartChanged, setCartChanged] = useState(false);

  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      setCartItems(cartData);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    if (cartChanged) {
      fetchCart();
      setCartChanged(false); // Reset cartChanged after initiating the fetch
    }
  }, [cartChanged]);

  // Separate useEffect for the initial fetch
  useEffect(() => {
    if (user) {
      fetchCart(); // Initial fetch
    }
  }, []);

  return (
    <div className="m-2">
      {cartItems.length === 0 && (
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
      {cartItems.length > 0 && (
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
                      { length: item.product.stock || 25 },
                      (_, index) => index + 1
                    );
                    return (
                      <tr key={index}>
                        <td>
                          <Link
                            to={`/Products/${
                              item.product.id || item.product._id
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
                              setCartChanged(true);
                              removeProductFromCart(item.product._id);
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
              <CardSummary cartItems={cartItems} setCartItems={setCartItems} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
