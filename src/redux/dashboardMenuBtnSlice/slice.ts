import { createSlice } from "@reduxjs/toolkit";
import { DashboardMenuBtnType } from "./types";

const initialState: DashboardMenuBtnType = {
  isModalOpen: false,
};

const dashboardMenuBtnSlice = createSlice({
  name: "dashboardMenuBtn",
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

export const { toggleMenu, closeMenu } = dashboardMenuBtnSlice.actions;

export default dashboardMenuBtnSlice.reducer;
