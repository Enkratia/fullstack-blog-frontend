"use client";

import React from "react";

import { useGetCategoryHeaderQuery } from "../../../redux/backendApi";
import { useAppDispatch } from "../../../redux/store";
import { setToast } from "../../../redux/toastSlice/slice";

import { EditCategorySection1Form, SkeletonDashboardForm } from "../../../components";

export const EditCategorySection1Block: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data, isError, originalArgs, endpointName } = useGetCategoryHeaderQuery();

  // **
  React.useEffect(() => {
    if (isError) {
      dispatch(
        setToast({
          type: "warning",
          args: endpointName + "" + originalArgs,
          text: "Failed to load data.",
        }),
      );
    }
  }, [isError]);

  //  **
  if (!data) {
    return <SkeletonDashboardForm />;
  }

  return <EditCategorySection1Form data={data} />;
};
