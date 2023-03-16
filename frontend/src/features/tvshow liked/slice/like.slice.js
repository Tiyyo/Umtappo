import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getQueries = (arrIds, languages) => {
  let query = arrIds.map((id) => {
    return `https://api.themoviedb.org/3/tv/${id}?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}`;
  });
  return query;
};

export const getIdsTvshowsLiked = createAsyncThunk(
  "getTvshowsLiked",
  async (arg, { dispatch, getState }) => {
    console.log("yeah");
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

export const getFetchTvshow = createAsyncThunk(
  "getFetchTvshow",
  async (languages, { dispatch, getState }) => {
    const arrIds = getState().tvshowLiked.ids.map((m) => m.id);
    const queries = getQueries(arrIds, languages);

    const result = await axios
      .all(
        queries.map((query) => {
          return axios.get(query);
        })
      )
      .then((res) => {
        let content = res.map((r) => r.data);

        let uniqueContent = Array.from(new Set(content.map((c) => c.id))).map(
          (id) => {
            return content.find((c) => c.id === id);
          }
        );
        uniqueContent.forEach((c) => (c.type = "Tvshow"));
        dispatch(getFetchTvshowLiked(uniqueContent));
        return uniqueContent;
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
