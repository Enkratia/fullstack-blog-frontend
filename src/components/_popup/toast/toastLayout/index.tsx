"use client";

import { Toaster, toast } from "sonner";

import React from "react";

import { useAppSelector } from "../../../../redux/store";
import { selectToast } from "../../../../redux/toastSlice/selectors";

export const ToastLayout: React.FC = () => {
  const lastArg = React.useRef(0);
  const { allTypes, allTexts, allArgs } = useAppSelector(selectToast);

  React.useEffect(() => {
    allTypes.slice(lastArg.current).forEach((type, i) => {
      if (type) {
        toast[type](allTexts[i]);
      }

      lastArg.current += 1;
    });
  }, [allTypes, allTexts, allArgs]);

  return (
    <div>
      <Toaster richColors />
    </div>
  );
};
