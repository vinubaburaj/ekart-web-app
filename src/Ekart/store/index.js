import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../Cart/cartReducer";
import wishlistReducer from "../Wishlist/wishlistReducer";

const store = configureStore({
    reducer: {
        cartReducer,
        wishlistReducer,
    },
});

export default store;