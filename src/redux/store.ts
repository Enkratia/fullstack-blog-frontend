import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";

import { backendApi } from "./backendApi";
import menuBtn from "./menuBtnSlice/slice";
import auth from "./authSlice/slice";
import revalidation from "./revalidationSlice/slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth,
      menuBtn,
      revalidation,
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
