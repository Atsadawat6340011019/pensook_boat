import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import selectSlice from "./selectSlice";
import mobileSlice from "./mobileSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    select: selectSlice,
    mobile: mobileSlice,
  },
});
