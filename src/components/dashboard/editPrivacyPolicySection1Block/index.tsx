"use client";

import React from "react";

import { useGetPrivacyPolicyQuery } from "../../../redux/backendApi";

import { EditPrivacyPolicySection1Form, SkeletonDashboardPrivacyPolicy } from "../../../components";
import { useAppDispatch } from "@/redux/store";
import { setToast } from "@/redux/toastSlice/slice";

export const EditPrivacyPolicySection1Block: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, isError, originalArgs, endpointName } = useGetPrivacyPolicyQuery();

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

  if (!data) {
    return <SkeletonDashboardPrivacyPolicy />;
  }

  return (
    <div>
      <EditPrivacyPolicySection1Form data={data} />
    </div>
  );
};
