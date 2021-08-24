import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import memberReducer from "../features/memberSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    member: memberReducer,
  },
});
