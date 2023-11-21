import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
  notification: [],
  updateData: [],
  updateCommentData: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddUserData: (state, action) => {
      state.userData = action.payload;
    },
    AddNotificationData: (state, action) => {
      state.notification = action.payload;
    },
    UpdateData: (state, action) => {
      state.updateData = action.payload;
    },
    UpdataCommentData: (state, action) => {
      state.updateCommentData = action.payload;
    },
  },
});

export const {
  AddUserData,
  UpdateData,
  UpdataCommentData,
  AddNotificationData,
} = userSlice.actions;

export default userSlice.reducer;
