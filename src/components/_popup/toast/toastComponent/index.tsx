"use client";

import React from "react";

import { useAppDispatch } from "../../../../redux/store";
import { setToast } from "../../../../redux/toastSlice/slice";
import type { ToastPayload } from "../../../../redux/toastSlice/types";

export const ToastComponent: React.FC<ToastPayload> = ({ text, type, args }) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setToast({ text, type, args }));
  }, [text, type, args]);

  return <></>;
};
