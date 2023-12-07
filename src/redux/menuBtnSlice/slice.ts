import { createSlice } from "@reduxjs/toolkit";
import { MenuBtnType } from "./types";

const initialState: MenuBtnType = {
  isModalOpen: false,
};

const menuBtnSlice = createSlice({
  name: "menuBtn",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    closeMenu: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { toggleMenu, closeMenu } = menuBtnSlice.actions;

export default menuBtnSlice.reducer;
