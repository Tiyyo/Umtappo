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

const likesSlice = createSlice({
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
      console.log(payload.id);
      state.ids = state.ids.filter((m) => m.id !== payload.id);
    },
    getFetchMovieLiked: (state, { payload }) => {
      state.fetchMedia = payload;
    },
    deleteMovieFromFetch: (state, { payload }) => {
      state.fetchMedia = state.fetchMedia.filter((m) => m.id !== payload.id);
    },
  },
});

const { actions, reducer } = likesSlice;
export const {
  likeMovie,
  dislikeMovie,
  getIdsMoviesLikedSuccess,
  getFetchMovieLiked,
  deleteMovieFromFetch,
} = actions;
export default reducer;
