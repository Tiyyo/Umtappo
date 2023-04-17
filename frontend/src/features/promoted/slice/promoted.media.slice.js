import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUniqueArrayMovie = createAsyncThunk(
  "getUniqueArrayMovie",
  async (arg, { dispatch, getStatte, rejectWithValue }) => {}
);

const initialState = {
  loading: "idle",
};

const promotedMediaSlice = createSlice({
  name: "promoted_media",
  initialState,
  reducers: {
    getUniqueArrayMovie: (state, action) => {},
  },
  extraReducers: (builder) => {},
});

const { actions, reducer } = promotedMediaSlice;

export const {} = actions;
export default reducer;
