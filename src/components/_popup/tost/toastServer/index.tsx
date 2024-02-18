"use client";

import React from "react";

import { useAppDispatch } from "../../../../redux/store";

type ToastServerProps = {
  text: string;
  type: "default" | "warning" | "error";
  requestId: string;
};

export const ToastServer: React.FC<ToastServerProps> = ({ text, type, requestId }) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch({ text, type, requestId });
  }, [text, type, requestId]);

  return <></>;
};
