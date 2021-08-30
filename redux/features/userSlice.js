import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userLikes: [],
  userCommentLikes: [],
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
    setUserCommentLikes: (state, action) => {
      state.userCommentLikes = action.payload;
    },
  },
});

export const { setUser, setUserLikes, setUserCommentLikes } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectUserLikes = (state) => state.user.userLikes;
export const selectUserCommentLikes = (state) => state.user.userCommentLikes;

export default userSlice.reducer;
