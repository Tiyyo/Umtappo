import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getRating = createAsyncThunk(
  "getRating",
  async (user_id, { rejectWithValue }) => {
    const result = await axios
      .get("http://localhost:5000/rate/get/" + user_id)
      .then((res) => res.data.rates)
      .catch((err) => rejectWithValue(err.response.data));
    return result;
  }
);

const initialState = {
  rates: [],
  loading: "idle",
};

const ratingSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {
    addRating: (state, { payload }) => {
      state.rates.push(payload);
    },
    deleteRating: (state, { payload }) => {},
    editRating: (state, { payload }) => {
      state.rates = state.rates.map((el) => {
        if (el._id === payload._id) {
          el.rate = payload.newRate;
        }
        {
          return el;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRating.fulfilled, (state, action) => {
        state.loading = "idle";
        state.rates = action.payload;
      })
      .addCase(getRating.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(getRating, (state, action) => {
        state.loading = "failed";
      });
  },
});

const { actions, reducer } = ratingSlice;
export const { addRating, editRating } = actions;
export default reducer;
