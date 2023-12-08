import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  showSpinner: false
};

const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    toggleSpinner(state, action) {
      state.showSpinner = action.payload;
    }
  }
});

export const {toggleSpinner} = spinnerSlice.actions;
export default spinnerSlice.reducer;