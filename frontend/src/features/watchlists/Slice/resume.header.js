import { createSlice } from "@reduxjs/toolkit";

const ResumeHeaderSlice = createSlice({
  name: "header_resume",
  initialState: {},
  reducers: {
    displayInfos: (state, { payload }) => {
      state.header_resume = payload;
    },
  },
});

const { actions, reducer } = ResumeHeaderSlice;
export const { displayInfos } = actions;
export default reducer;
