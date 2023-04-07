import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserData = createAsyncThunk(
  "getUserData",
  async (arg, { dispatch, getState, rejectWithValue }) => {
    const user_id = getState().user.user.id;
    const result = await axios
      .get("http://localhost:5000/user/" + arg)
      .then((res) => {
        return res.data;
      })
      .catch((err) => rejectWithValue(err.response.data));
    return result;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: null,
      username: null,
      email: null,
      pictures: [],
    },
    loading: "idle",
  },
  reducers: {
    getCurrentUser: (state, { payload }) => {
      console.log(typeof payload);
      state.user.id = payload;
    },
    editEmail: (state, { payload }) => {
      state.user.email = payload;
    },
    editUsername: (state, { payload }) => {
      state.user.username = payload;
    },
    clearUser: (state, { payload }) => {
      state.user = "";
    },
    updatePictures: (state, { payload }) => {
      state.user.pictures = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.loading = "idle";
        state.user.username = payload.username;
        state.user.email = payload.email;
        state.user.pictures = payload.pictures;
      })
      .addCase(getUserData.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = "failed";
      });
  },
});

const { actions, reducer } = userSlice;
export const {
  getCurrentUser,
  editEmail,
  editUsername,
  clearUser,
  updatePictures,
} = actions;
export default reducer;
