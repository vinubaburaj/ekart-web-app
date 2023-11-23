import { useSelector } from "react-redux";
import { addProductToCart, deleteProductFromCart } from "./cartReducer";

function Cart() {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  return (
    <>
      <h4>Cart Items:</h4>
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
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn me-2 btn-danger">Empty Cart</button>
      <button className="btn btn-primary">Place Order</button>
    </>
  );
}

export default Cart;
