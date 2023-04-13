import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getQueries = (arrIds, languages) => {
  let query = arrIds.map((id) => {
    return `https://api.themoviedb.org/3/tv/${id}?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}`;
  });
  return query;
};

export const getIdsTvshowsLiked = createAsyncThunk(
  "getIdsTvshowsLiked",
  async (arg, { dispatch, getState, rejectWithValue }) => {
    const result = await axios
      .get("https://umtappo-api.onrender.com/like/tv/" + arg)
      .then((res) => {
        let arr = [];
        res.data.tvshow_liked.map((r) => {
          return r.map((l) => arr.push(l));
        });
        return arr;
      })
      .catch((err) => rejectWithValue(err.response.data));
    return result;
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
        uniqueContent.forEach((c) => (c.media_type = "tv"));
        return uniqueContent;
      });
    return result;
  }
);

const likesSlice = createSlice({
  name: "tvshow_liked",
  initialState: { ids: [], fetchMedia: [], loading: "idle" },
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
    deleteTvshowFromFetch: (state, { payload }) => {
      state.fetchMedia = state.fetchMedia.filter((m) => m.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIdsTvshowsLiked.fulfilled, (state, action) => {
        state.ids = action.payload;
        state.loading = "idle";
      })
      .addCase(getIdsTvshowsLiked.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(getIdsTvshowsLiked.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(getFetchTvshow.fulfilled, (state, action) => {
        state.fetchMedia = action.payload;
        state.loading = "idle";
      })
      .addCase(getFetchTvshow.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(getFetchTvshow.rejected, (state, action) => {
        state.loading = "failed";
      });
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
