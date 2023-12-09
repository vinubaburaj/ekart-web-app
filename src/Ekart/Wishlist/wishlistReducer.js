import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlistItems",
  initialState,
  reducers: {
    setWishlistItems(state, action) {
      state.wishlistItems = action.payload;
    }
  }
});

export const {
  setWishlistItems
} = wishlistSlice.actions;

export default wishlistSlice.reducer;