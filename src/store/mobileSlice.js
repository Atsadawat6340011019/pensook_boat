import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationMobile: false,
  menuMobile: false,
  searchMobile: false,
  commentMobile: false,
};

export const mobileSlice = createSlice({
  name: "mobile",
  initialState,
  reducers: {
    setNotiMobile: (state, action) => {
      state.notificationMobile = action.payload;
    },
    setMenuMobile: (state, action) => {
      state.menuMobile = action.payload;
    },
    setSearchMobile: (state, action) => {
      state.searchMobile = action.payload;
    },
    setCommentMobile: (state, action) => {
      state.commentMobile = action.payload;
    },
  },
});

export const {
  setNotiMobile,
  setMenuMobile,
  setSearchMobile,
  setCommentMobile,
} = mobileSlice.actions;

export default mobileSlice.reducer;
