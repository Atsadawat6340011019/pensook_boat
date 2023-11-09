import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postIdSelect: [],
  commentIdSelect: [],
};

export const selectSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    AddPostId: (state, action) => {
      state.postIdSelect = action.payload;
    },
    AddCommentId: (state, action) => {
      state.commentIdSelect = action.payload;
    },
  },
});

export const { AddPostId, AddCommentId } = selectSlice.actions;

export default selectSlice.reducer;
