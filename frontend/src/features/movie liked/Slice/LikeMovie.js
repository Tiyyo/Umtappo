import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMoviesLiked = createAsyncThunk(
  "getMovieLiked",
  async (arg, { dispatch, getState }) => {
    const user_id = getState().user.user.id;
    axios.get("http://localhost:5000/like/movie" + user_id).then((res) => {
      dispatch(getMoviesLikedSuccess(res));
    });
  }
);

const LikesSlice = createSlice({
  name: "movie_liked",
  initialState: { likes: [] },
  reducers: {
    getMoviesLikedSuccess: (state, { payload }) => {
      state.movie_liked = payload;
    },
    likeMovie: (state, { payload }) => {
      state.movie_liked.push(payload);
    },
    dislikeMovie: (state, { payload }) => {
      state.movie_liked = state.movie_liked.filter((m) => m.id !== payload.id);
    },
  },
});

const { actions, reducer } = LikesSlice;
export const { likeMovie, dislikeMovie, getMoviesLikedSuccess } = actions;
export default reducer;
