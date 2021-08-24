import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  masks: null,
  selectedMask: null,
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMasks: (state, action) => {
      state.masks = action.payload;
    },
    setSelectedMask: (state, action) => {
      state.selectedMask = action.payload;
    },
  },
});

export const { setMasks, setSelectedMask } = memberSlice.actions;

// Selectors
export const selectMasks = (state) => state.member.masks;
export const selectSelectedMask = (state) => state.member.selectedMask;

export default memberSlice.reducer;
