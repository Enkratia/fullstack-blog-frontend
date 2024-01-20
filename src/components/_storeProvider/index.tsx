"use client";

import React from "react";
import { Provider } from "react-redux";

import { makeStore, AppStore } from "../../redux/store";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = React.useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <div>
      <Provider store={storeRef.current}>{children}</Provider>
    </div>
  );
};
