import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getMediaInfos = createAsyncThunk({});

const modalMediaSlice = createSlice({
  name: "media_modal",
  initialState: {
    content: [],
    loading: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase().addCase().addCase();
  },
});

const { actions, reducer } = modalMediaSlice;
export const {} = actions;
export default reducer;
