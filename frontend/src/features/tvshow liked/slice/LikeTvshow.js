import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTvshowsLiked = createAsyncThunk(
  "getTvshowsLiked",
  async (arg, { dispatch, getState }) => {
    const result = await axios
      .get("http://localhost:5000/like/tvshow/" + arg)
      .then((res) => {
        dispatch(getTvshowsLikedSucces(res.data.tvshow_liked));
      });
  }
);

const LikesSlice = createSlice({
  name: "tvshow_liked",
  initialState: { likes: [] },
  reducers: {
    getTvshowsLikedSucces: (state, { payload }) => {
      state.likes = payload;
    },
    likeTvshow: (state, { payload }) => {
      console.log(payload);
      state.likes.push(payload);
    },
    dislikeTvshow: (state, { payload }) => {
      state.likes = state.likes.filter((m) => m.id !== payload.id);
    },
  },
});

const { actions, reducer } = LikesSlice;
export const { likeTvshow, dislikeTvshow, getTvshowsLikedSucces } = actions;
export default reducer;
