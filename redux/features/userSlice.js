import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userLikes: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserLikes: (state, action) => {
      state.userLikes = action.payload;
    },
  },
});

export const { setUser, setUserLikes } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectUserLikes = (state) => state.user.userLikes;

export default userSlice.reducer;
