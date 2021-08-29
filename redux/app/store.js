import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import ghostReducer from "../features/ghostSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ghost: ghostReducer,
  },
});
