import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../Cart/cartReducer";
import wishlistReducer from "../Wishlist/wishlistReducer";
import userReducer from "../Auth/userReducer";

const store = configureStore({
    reducer: {
        cartReducer,
        wishlistReducer,
        userReducer
    },
});

export default store;