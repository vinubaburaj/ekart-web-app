import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  currentUser: undefined,
  role: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    }
  },
});

export const {setCurrentUser, setRole} = userSlice.actions;
export default userSlice.reducer;
