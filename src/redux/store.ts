import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";

import { backendApi } from "./backendApi";
import menuBtn from "./menuBtnSlice/slice";
import dashboardMenuBtn from "./dashboardMenuBtnSlice/slice";
import auth from "./authSlice/slice";
import toast from "./toastSlice/slice";
import test from "./testSlice/slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      test,
      auth,
      menuBtn,
      dashboardMenuBtn,
      toast,
      [backendApi.reducerPath]: backendApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(backendApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
