import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getLists = createAsyncThunk(
  "getLists",
  async (arg, { dispatch, getState }) => {
    // getState().lists.lists.loading = "failed";
    const result = await axios
      .get("http://localhost:5000/list/" + arg)
      .then((res) => {
        dispatch(getListsSucces(res.data));
      });

    return result.data;
  }
);

const initialState = {
  lists: [],
  loading: "idle", // idle pending succeeded failed,
};

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    createList: (state, { payload }) => {
      state.lists.push(payload);
    },
    getListsSucces: (state, { payload: { lists } }) => {
      state.lists = lists;
    },
    addContent: (state, { payload: { content, listId } }) => {
      state.lists = state.lists.forEach((list) => {
        if (list._id === listId) {
          list.content.push(content);
        }
      });
    },
    deleteContent: (state, { payload: { listID, contentId } }) => {
      state.lists = state.lists.map((list) => {
        return list._id !== listID
          ? list
          : {
              ...list,
              content: list.content.filter((el) => el.id !== contentId),
            };
      });
    },

    deleteList: (state, { payload: { _id: id } }) => {
      state.lists = state.lists.filter((list) => list._id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLists.fulfilled, (state, action) => {
      state.loading = "succeeded";
    });
  },
});

const { actions, reducer } = listSlice;
export const {
  createList,
  getListsSucces,
  addContent,
  deleteContent,
  deleteList,
} = actions;
export default reducer;
