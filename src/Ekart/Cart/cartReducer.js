import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
};
const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.cartItems = [action.payload, ...state.cartItems];
    },
    deleteProductFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((c) => c._id !== action.payload);
    },
  },
});

export const { addProductToCart, deleteProductFromCart } = cartSlice.actions;

export default cartSlice.reducer;
