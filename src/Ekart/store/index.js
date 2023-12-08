import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../Cart/cartReducer";
import wishlistReducer from "../Wishlist/wishlistReducer";
import userReducer from "../Auth/userReducer";
import spinnerReducer from "./spinnerReducer";
import sellerProductsReducer from "../Seller/sellerProductsReducer";

const store = configureStore({
    reducer: {
        cartReducer,
        wishlistReducer,
        userReducer,
        spinnerReducer,
        sellerProductsReducer
    },
});

export default store;