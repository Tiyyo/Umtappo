import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  loading: "idle",
};

const displayModalContentSlice = createSlice({
  name: "modal_display_content",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = action.payload;
    },
    closeModal: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

const { actions, reducer } = displayModalContentSlice;
export const { openModal, closeModal } = actions;
export default reducer;
