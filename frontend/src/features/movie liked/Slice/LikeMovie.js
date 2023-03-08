import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getIdsMoviesLiked = createAsyncThunk(
  "getMoviesLiked",
  async (arg, { dispatch, getState }) => {
    const result = await axios
      .get("http://localhost:5000/like/movie/" + arg)
      .then((res) => {
        if (res.status === 200) {
          let arr = [];
          res.data.movie_liked.map((r) => {
            return r.map((l) => arr.push(l));
          });
          dispatch(getIdsMoviesLikedSuccess(arr));
        }
      })
      .catch((err) => console.log(err));
  }
);

const LikesSlice = createSlice({
  name: "movie_liked",
  initialState: { ids: "", fetchMedia: [] },
  reducers: {
    getIdsMoviesLikedSuccess: (state, { payload }) => {
      state.ids = payload;
    },
    likeMovie: (state, { payload }) => {
      state.ids.push(payload);
    },
    dislikeMovie: (state, { payload }) => {
      state.ids = state.likes.filter((m) => m.id !== payload.id);
    },
    getFetchCTvshowLiked: (state, { payload }) => {
      state.fetchMedia = "Content goes here";
    },
  },
});

const { actions, reducer } = LikesSlice;
export const {
  likeMovie,
  dislikeMovie,
  getIdsMoviesLikedSuccess,
  getFetchCTvshowLiked,
} = actions;
export default reducer;
