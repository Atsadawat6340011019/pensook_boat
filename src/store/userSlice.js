import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
  updateData: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddUserData: (state, action) => {
      state.userData = action.payload;
    },
    UpdateData: (state, action) => {
      state.updateData = action.payload;
    },
  },
});

export const { AddUserData, UpdateData } = userSlice.actions;

export default userSlice.reducer;
