import { createSlice } from "@reduxjs/toolkit";

const ResumeHeaderSlice = createSlice({
  name: "header_resume",
  initialState: {},
  reducers: {
    displayInfos: (state, { payload }) => {
      state.header_resume = payload;
    },
    reset: (state, action) => {
      state.header_resume = {};
    },
  },
});

const { actions, reducer } = ResumeHeaderSlice;
export const { displayInfos, reset } = actions;
export default reducer;
