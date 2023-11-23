import { useSelector, useDispatch } from "react-redux";
import { deleteProductFromCart, emptyCart } from "./cartReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Button } from "@mui/material";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  return (
    <div className="m-2">
      <h4> Items in Cart:</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>1</td>
              <td>
                <IconButton
                  color="error"
                  onClick={() => dispatch(deleteProductFromCart(item._id))}
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {cartItems.length > 0 && (
        <div>
          <Button
            variant="contained"
            className="me-2"
            color="error"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button variant="contained" color="primary">
            Place Order
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
