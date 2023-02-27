import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
    },
  },
  reducers: {
    getCurrentUser: (state, { payload }) => {
      state.user.id = payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { getCurrentUser } = actions;
export default reducer;
