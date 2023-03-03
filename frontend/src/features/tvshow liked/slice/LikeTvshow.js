import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTvshowsLiked = createAsyncThunk(
  "getTvshowsLiked",
  async (arg, { dispatch, getState }) => {
    const user_id = getState().user.user.id;
    axios.get("http://localhost:5000/like/tvshow" + user_id).then((res) => {
      dispatch(getTvshowsLikedSucces(res));
    });
  }
);

const LikesSlice = createSlice({
  name: "tvshow_liked",
  initialState: { likes: [] },
  reducers: {
    getTvshowsLikedSucces: (state, { payload }) => {
      state.tvshow_liked = payload;
    },
    likeTvshow: (state, { payload }) => {
      state.tvshow_liked.push(payload);
    },
    dislikeTvshow: (state, { payload }) => {
      state.tvshow_liked = state.tvshow_liked.filter(
        (m) => m.id !== payload.id
      );
    },
  },
});

const { actions, reducer } = LikesSlice;
export const { likeTvshow, dislikeTvshow, getTvshowsLikedSucces } = actions;
export default reducer;
