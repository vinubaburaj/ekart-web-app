import { useSelector } from "react-redux";
import { addProductToCart, deleteProductFromCart } from './cartReducer';

function Cart () {

    const cartItems = useSelector((state) => state.cartReducer.cartItems);

    return (
        <>
        <h4>Cart Items:</h4>
        {JSON.stringify(cartItems)}
        <ul className="list-group">
            {cartItems.map((item, index) => (
                <li key={index} className="list-group-item">
                    {item.name}
                </li>
            ))}
        </ul>
        </>
    )
}

export default Cart;