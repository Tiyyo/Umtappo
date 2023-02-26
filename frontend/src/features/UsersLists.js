import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useLocation } from "react-router";
useEffect(() => {});

const userListSlice = createSlice({
  name: "userLists",
  initialState: { value: [] },
  reducers: {
    createList: (state, action) => {},
    addContent: (state, action) => {},
    deleteContent: (state, action) => {},
    deleteList: (state, action) => {},
  },
});

const { actions, reducer } = userListSlice;
export const { createList, addContent, deleteContent, deleteList } = actions;
export default reducer;
