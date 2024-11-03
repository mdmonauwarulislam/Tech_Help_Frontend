import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBlogUpdated: false,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    handleIsBlogUpdated: (state) => {
      state.isBlogUpdated = !state.isBlogUpdated;
    },
  },
});

export const { handleIsBlogUpdated } = projectSlice.actions;
export default projectSlice.reducer;
