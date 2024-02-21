"use client";

import { Toaster, toast } from "sonner";

import React from "react";

import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { selectToast } from "../../../../redux/toastSlice/selectors";
import { resetTextsTypes } from "../../../../redux/toastSlice/slice";

export const ToastLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allTypes, allTexts } = useAppSelector(selectToast);

  React.useEffect(() => {
    if (!allTypes.length || !allTexts.length) return;

    allTypes.forEach((type, i) => {
      if (type) {
        toast[type](allTexts[i]);
      }
    });

    dispatch(resetTextsTypes());
  }, [allTypes, allTexts]);

  return (
    <div>
      <Toaster richColors />
    </div>
  );
};
