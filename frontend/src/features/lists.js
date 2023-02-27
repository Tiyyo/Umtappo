import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getLists = createAsyncThunk(
  "getLists",
  async (arg, { dispatch, getState }) => {
    const user_id = getState().user.user.id;
    axios
      .get("http://localhost:5000/list/" + user_id)
      .then((res) => dispatch(getListsSucces(res.data)));
  }
);

const ListSlice = createSlice({
  name: "lists",
  initialState: { lists: [] },
  reducers: {
    createList: (state, { payload }) => {
      state.lists.push(payload);
    },
    getListsSucces: (state, { payload }) => {
      state.lists = payload;
    },
    addContent: (state, { payload: { content, listId } }) => {
      state.lists.forEach((list) => {
        if (list._id === listId) {
          list.content.push(content);
        }
      });
    },
    deleteContent: (state, { payload: { contentId, listID } }) => {
      for (let i = 0; i < state.lists.length; i++) {
        if (state.lists[i]._id == listID) {
          state.lists[i].content = state.lists[i].content.filter(
            (element) => element.id !== contentId
          );
        }
      }
    },
    deleteList: (state, { payload }) => {
      state.lists = state.lists.filter((list) => list._id !== payload);
    },
  },
});

const { actions, reducer } = ListSlice;
export const {
  createList,
  getListsSucces,
  addContent,
  deleteContent,
  deleteList,
} = actions;
export default reducer;
