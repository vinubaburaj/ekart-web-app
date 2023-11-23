import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Cart/cartReducer";

const store = configureStore({
    reducer: {
        cartReducer,
    },
});

export default store;