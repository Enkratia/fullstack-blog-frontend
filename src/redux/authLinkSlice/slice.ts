import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthLinkSliceType } from "./types";

const initialState: AuthLinkSliceType = {
  authLink: "",
};

const authLinkSlice = createSlice({
  name: "authLinkSlice",
  initialState,
  reducers: {
    setAuthLink: (state, action: PayloadAction<string>) => {
      state.authLink = action.payload;
    },
  },
});

export const { setAuthLink } = authLinkSlice.actions;
export default authLinkSlice.reducer;
