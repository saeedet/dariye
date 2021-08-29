import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ghosts: null,
  selectedGhost: null,
};

export const ghostSlice = createSlice({
  name: "ghost",
  initialState,
  reducers: {
    setGhosts: (state, action) => {
      state.ghosts = action.payload;
    },
    setSelectedGhost: (state, action) => {
      state.selectedGhost = action.payload;
    },
  },
});

export const { setGhosts, setSelectedGhost } = ghostSlice.actions;

// Selectors
export const selectGhosts = (state) => state.ghost.ghosts;
export const selectSelectedGhost = (state) => state.ghost.selectedGhost;

export default ghostSlice.reducer;
