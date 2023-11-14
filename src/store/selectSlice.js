import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postIdSelect: [],
  commentIdSelect: [],
  keepPostIdSelect: undefined,
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
    AddKeepPostId: (state, action) => {
      state.keepPostIdSelect = action.payload;
    },
  },
});

export const { AddPostId, AddCommentId, AddKeepPostId } = selectSlice.actions;

export default selectSlice.reducer;
