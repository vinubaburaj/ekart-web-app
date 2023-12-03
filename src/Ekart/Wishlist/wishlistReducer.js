import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlistItems",
  initialState,
  reducers: {
    addProductToWishlist: (state, action) => {
      if (state.wishlistItems.find(
          (item, index) => item.id === action.payload.id)) {
        return;
      }
      state.wishlistItems = [action.payload, ...state.wishlistItems];
    },
    deleteProductFromWishlist: (state, action) => {
      console.log('delete rom wishlist: ', action.payload);
      state.wishlistItems = state.wishlistItems.filter(
          (c) => c.id !== action.payload);
    },
    emptyWishlist: (state) => {
      state.wishlistItems = [];
    },
  }
});

export const {
  addProductToWishlist,
  deleteProductFromWishlist,
  emptyWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;