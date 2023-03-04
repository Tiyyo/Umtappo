import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMoviesLiked = createAsyncThunk(
  "getMoviesLiked",
  async (arg, { dispatch, getState }) => {
    const result = await axios
      .get("http://localhost:5000/like/movie/" + arg)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getMoviesLikedSuccess(res.data.movie_liked));
        }
      })
      .catch((err) => console.log(err));
  }
);

const LikesSlice = createSlice({
  name: "movie_liked",
  initialState: { likes: [] },
  reducers: {
    getMoviesLikedSuccess: (state, { payload }) => {
      state.likes = payload;
    },
    likeMovie: (state, { payload }) => {
      state.likes.push(payload);
    },
    dislikeMovie: (state, { payload }) => {
      state.likes = state.likes.filter((m) => m.id !== payload.id);
    },
  },
});

const { actions, reducer } = LikesSlice;
export const { likeMovie, dislikeMovie, getMoviesLikedSuccess } = actions;
export default reducer;
