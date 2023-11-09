import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import selectSlice from "./selectSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    select: selectSlice,
  },
});
