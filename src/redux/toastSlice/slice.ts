import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ToastInitialStateType, ToastPayload } from "./types";

const initialState: ToastInitialStateType = {
  toastInfo: {
    allArgs: [],
    allTexts: [],
    allTypes: [],
  },
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<ToastPayload>) => {
      const allArgs = state.toastInfo.allArgs;
      const allTexts = state.toastInfo.allTexts;
      const allTypes = state.toastInfo.allTypes;

      const args = action.payload.args;
      const text = action.payload.text;
      const type = action.payload.type;

      // **
      if (Array.isArray(args) && Array.isArray(text) && Array.isArray(type)) {
        const idxs: number[] = [];

        const tmpArgs = args.filter((el, i) => {
          if (!allArgs.includes(el)) {
            idxs.push(i);
            return args[i];
          }
        });

        if (tmpArgs.length) {
          state.toastInfo = {
            allArgs: [...allArgs, ...tmpArgs],
            allTexts: text.filter((_, i) => idxs.includes(i)),
            allTypes: type.filter((_, i) => idxs.includes(i)),
          };
        }
      }

      // **
      if (typeof args === "string" && typeof text === "string" && typeof type === "string") {
        if (!allArgs.includes(args)) {
          state.toastInfo = {
            allArgs: [...allArgs, args],
            allTexts: [...allTexts, text],
            allTypes: [...allTypes, type],
          };
        }
      }
    },
    resetTextsTypes: (state) => {
      state.toastInfo = {
        ...state.toastInfo,
        allTexts: [],
        allTypes: [],
      };
    },
  },
});

export const { setToast, resetTextsTypes } = toastSlice.actions;

export default toastSlice.reducer;
