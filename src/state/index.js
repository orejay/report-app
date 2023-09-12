import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarOpen: true,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSideBarOpen: (state, action) => {
      state.isSideBarOpen = action.payload;
    },
  },
});

export const { setIsSideBarOpen } = globalSlice.actions;
export default globalSlice.reducer;
