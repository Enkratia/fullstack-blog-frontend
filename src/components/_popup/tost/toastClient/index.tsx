"use client";

import { Toaster, toast } from "sonner";

import React from "react";

import { useAppSelector } from "../../../../redux/store";
import { selectToast } from "../../../../redux/toastSlice/selectors";

export const ToastClient: React.FC = () => {
  const { type, text } = useAppSelector(selectToast);

  React.useEffect(() => {
    if (type) {
      toast[type](text);
    }
  }, [type, text]);

  return (
    <div>
      <Toaster />
    </div>
  );
};
