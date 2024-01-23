import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RevalidationSliceType } from "./types";

const initialState: RevalidationSliceType = {
  isRevalidate: undefined,
};

const RevalidationSlice = createSlice({
  name: "revalidation",
  initialState,
  reducers: {
    setRevalidation: (state) => {
      state.isRevalidate = {};
    },
  },
});

export const { setRevalidation } = RevalidationSlice.actions;
export default RevalidationSlice.reducer;
