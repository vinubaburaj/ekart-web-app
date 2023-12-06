import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartItemsCount: [],
};
const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      if (state.cartItems.find(
          (item, index) => item.product.id === action.payload.product.id)) {
        state.cartItems = state.cartItems.map((item, index) => {
          if (item.product.id === action.payload.product.id) {
            return {
              ...item,
              quantity: Math.min(
                  parseInt(item.quantity) + parseInt(action.payload.quantity),
                  4)
            }
          }
          return item;
        });
        return;
      }
      state.cartItems = [action.payload, ...state.cartItems];
    },
    deleteProductFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((c) => c.product.id !== action.payload);
    },
    setQuantity: (state, action) => {
      state.cartItems[action.payload.index].quantity = action.payload.value;
    },
    emptyCart: (state) => {
      state.cartItems = [];
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    }
    // setCartItemsCount: (state, action) => {
    //   state.cartItemsCount = action.payload;
    // },
    // incrementCartItemsCount: (state) => {
    //   state.numberOfCartItems += 1;
    // },
    // decrementCartItemsCount: (state) => {}
  },
});

export const {
  addProductToCart,
  deleteProductFromCart,
  emptyCart,
  setQuantity,
  setCartItems
} = cartSlice.actions;

export default cartSlice.reducer;
