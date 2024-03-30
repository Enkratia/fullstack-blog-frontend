"use client";

import React from "react";

import { useGetAboutUsStaticQuery } from "../../../redux/backendApi";
import { useAppDispatch } from "../../../redux/store";
import { setToast } from "../../../redux/toastSlice/slice";

import { EditAboutUsSection1Form, SkeletonDashboardForm } from "../../../components";

export const EditAboutUsSection1Block: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data, isError, originalArgs, endpointName } = useGetAboutUsStaticQuery();
  const info = data?.[0];

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

  // **
  if (!info) {
    return <SkeletonDashboardForm />;
  }

  return <EditAboutUsSection1Form info={info} />;
};
