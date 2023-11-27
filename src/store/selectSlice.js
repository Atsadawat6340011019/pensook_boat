import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postIdSelect: [],
  commentIdSelect: [],
  keepPostIdSelect: undefined,
  checkSecondComment: false,
  postArray: undefined,
  checkNoti: false,
  keyword: undefined,
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
    CheckSecondComment: (state, action) => {
      state.checkSecondComment = action.payload;
    },
    AddSearchPostId: (state, action) => {
      state.postArray = action.payload;
    },
    CheckNoti: (state, action) => {
      state.checkNoti = action.payload;
    },
    AddSearchKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const {
  AddPostId,
  AddCommentId,
  AddKeepPostId,
  CheckSecondComment,
  AddSearchPostId,
  CheckNoti,
  AddSearchKeyword,
} = selectSlice.actions;

export default selectSlice.reducer;
