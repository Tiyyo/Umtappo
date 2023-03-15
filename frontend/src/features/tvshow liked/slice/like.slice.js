import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getIdsTvshowsLiked = createAsyncThunk(
  "getTvshowsLiked",
  async (arg, { dispatch, getState }) => {
    const result = await axios
      .get("http://localhost:5000/like/tvshow/" + arg)
      .then((res) => {
        let arr = [];
        res.data.tvshow_liked.map((r) => {
          return r.map((l) => arr.push(l));
        });
        dispatch(getIdsTvshowsLikedSucces(arr));
      });
  }
);

const likesSlice = createSlice({
  name: "tvshow_liked",
  initialState: { ids: [], fetchMedia: [] },
  reducers: {
    getIdsTvshowsLikedSucces: (state, { payload }) => {
      state.ids = payload;
    },
    likeTvshow: (state, { payload }) => {
      state.ids.push(payload);
    },
    dislikeTvshow: (state, { payload }) => {
      state.ids = state.ids.filter((m) => m.id !== payload.id);
    },
    getFetchTvshowLiked: (state, { payload }) => {
      state.fetchMedia = payload;
    },
    deleteTvshowFromFetch: (state, { payload }) => {
      state.fetchMedia = state.fetchMedia.filter((m) => m.id !== payload.id);
    },
  },
});

const { actions, reducer } = likesSlice;

export const {
  likeTvshow,
  dislikeTvshow,
  getIdsTvshowsLikedSucces,
  getFetchTvshowLiked,
  deleteTvshowFromFetch,
} = actions;
export default reducer;
