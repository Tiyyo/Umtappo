import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getQueries = (arrIds, languages) => {
  let query = arrIds.map((id) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}`;
  });
  return query;
};

export const getIdsMoviesLiked = createAsyncThunk(
  "getIdsMoviesLiked",
  async (arg, { dispatch, getState, rejectWithValue }) => {
    const result = await axios
      .get("http://localhost:5000/like/movie/" + arg)
      .then((res) => {
        if (res.status === 200) {
          let arr = [];
          res.data.movie_liked.map((r) => {
            return r.map((l) => arr.push(l));
          });
          return arr;
        }
      })
      .catch((err) => rejectWithValue(err.response.data));
    return result;
  }
);

export const getFetchMovie = createAsyncThunk(
  "getFetchMovie",
  async (languages, { dispatch, getState, rejectWithValue }) => {
    const arrIds = getState().movieLiked.ids.map((m) => m.id);
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
        uniqueContent.forEach((c) => (c.type = "Movie"));
        return uniqueContent;
      })
      .catch((err) => rejectWithValue(err.response.data));
    return result;
  }
);

const likesSlice = createSlice({
  name: "movie_liked",
  initialState: { ids: "", fetchMedia: [], loading: "idle" },
  reducers: {
    getIdsMoviesLikedSuccess: (state, { payload }) => {
      state.ids = payload;
    },
    likeMovie: (state, { payload }) => {
      state.ids.push(payload);
    },
    dislikeMovie: (state, { payload }) => {
      state.ids = state.ids.filter((m) => m.id !== payload.id);
    },
    deleteMovieFromFetch: (state, { payload }) => {
      state.fetchMedia = state.fetchMedia.filter((m) => m.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIdsMoviesLiked.fulfilled, (state, action) => {
        state.ids = action.payload;
      })
      .addCase(getIdsMoviesLiked.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(getIdsMoviesLiked.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(getFetchMovie.fulfilled, (state, action) => {
        state.fetchMedia = action.payload;
        state.loading = "idle";
      })
      .addCase(getFetchMovie.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(getFetchMovie.rejected, (state, action) => {
        state.loading = "failed";
      });
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
