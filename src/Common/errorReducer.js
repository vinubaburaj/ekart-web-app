import {createSlice} from "@reduxjs/toolkit";

const initialSState = {
  errorStatus: '',
  errorMessage: ''
}

const cartSlice = createSlice({
  name: 'error',
  initialState: initialSState,
  reducers: {
    setError: (state, action) => {
      state.errorStatus = action.payload.status;
      state.errorMessage = action.payload.message;
    },
    clearError: (state) => {
      state.errorStatus = '';
      state.errorMessage = '';
    },
  }
});
