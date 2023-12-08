import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  sellerProducts: [],
}

const sellerProductsSlice = createSlice({
  name: "sellerProducts",
  initialState,
  reducers: {
    setSellerProducts(state, action) {
      state.sellerProducts = action.payload;
    },
    deleteFromSellerProducts(state, action) {
      const productId = action.payload;
      state.sellerProducts = state.sellerProducts.filter(
          (product) => product.id !== productId);
    }
  }
});

export const {
  setSellerProducts,
  deleteFromSellerProducts
} = sellerProductsSlice.actions;

export default sellerProductsSlice.reducer;