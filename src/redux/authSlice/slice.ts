import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthSliceType } from "./types";

const initialState: AuthSliceType = {
  token: undefined,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = undefined;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
