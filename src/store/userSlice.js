import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { AddUserData } = userSlice.actions;

export default userSlice.reducer;
