import {useDispatch, useSelector} from "react-redux";
import {deleteProductFromCart, setQuantity} from "./cartReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import React, {useState} from "react";
import {PiSmileySad} from "react-icons/pi";
import {Link} from "react-router-dom";
import CardSummary from "./card-summary";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  console.log(cartItems);
  const [quantArr, setQuantArr] = useState(
      cartItems.map((item) => item.quantity || 1));
  console.log('cartItems: ', cartItems);
  const updateQuantity = (value, index) => {
    dispatch(setQuantity({value: parseInt(value), index: index}));
  }

  return (
      <div className="m-2">
        {cartItems.length === 0 && <>
          <div className={'fs-2 mt-4'}>
            Your cart is empty <PiSmileySad/>
          </div>
          <div className={'fs-5'}>Add items from your <Link
              to={'/Account/Wishlist'}>Wishlist</Link> or browse through
            the <Link to={'/Home'}>Home</Link> page.
          </div>
        </>}
        {cartItems.length > 0 && <>
          <div className={'fs-3'}>Items in Cart</div>
          <div className={'row'}>
            <div className={'col-9'}>
              <table className="table table-striped table-responsive">
                <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td><Link
                          to={`/Products/${item.product.id}`}>{item.product.title}</Link>
                      </td>
                      <td className={'col-3'}>${item.product.price}</td>
                      <td className={'col-1'}>
                        <FormControl className={'me-3'} color="primary">
                          <InputLabel id="qty">Qty</InputLabel>
                          <Select
                              value={item.quantity}
                              labelId="qty"
                              id="qty-input"
                              label="Quantity"
                              onChange={(e) => updateQuantity(e.target.value,
                                  index)}>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                          </Select>
                        </FormControl>
                      </td>
                      <td className={'col-1'}>
                        <IconButton
                            color="error"
                            onClick={() => dispatch(
                                deleteProductFromCart(item.product.id))}
                        >
                          <DeleteIcon/>
                        </IconButton>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className={'col-3'}>
              <CardSummary/>
            </div>
          </div>
        </>}
      </div>
  );
}

export default Cart;
