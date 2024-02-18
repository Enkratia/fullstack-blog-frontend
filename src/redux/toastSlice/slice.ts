import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ToastType, ToastPayload } from "./types";

const initialState: ToastType = {
  requestIds: [],
  text: "",
  type: undefined,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<ToastPayload>) => {
      const requestId = action.payload.requestId;
      const text = action.payload.text;
      const type = action.payload.type;

      if (requestId && !state.requestIds.includes(requestId)) {
        state.requestIds = [...state.requestIds, requestId];
        state.text = text;
        state.type = type;
      }
    },
  },
});

export const { setToast } = toastSlice.actions;

export default toastSlice.reducer;
