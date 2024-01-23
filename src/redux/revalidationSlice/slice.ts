import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RevalidationSliceType } from "./types";

const initialState: RevalidationSliceType = {
  isRevalidate: null,
};

const RevalidationSlice = createSlice({
  name: "authLinkSlice",
  initialState,
  reducers: {
    setRevalidation: (state, action: PayloadAction<{}>) => {
      state.isRevalidate = action.payload;
    },
  },
});

export const { setRevalidation } = RevalidationSlice.actions;
export default RevalidationSlice.reducer;
