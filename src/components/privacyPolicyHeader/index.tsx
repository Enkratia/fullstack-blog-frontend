"use client";

import React from "react";

import { useGetPrivacyPolicyQuery } from "../../redux/backendApi";
import { setToast } from "../../redux/toastSlice/slice";
import { useAppDispatch } from "../../redux/store";

import { SkeletonPrivacyPolicyHeader } from "../../components";
import { formatDate2 } from "../../utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./privacyPolicyHeader.module.scss";

export const PrivacyPolicyHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: policy, isError, originalArgs, endpointName } = useGetPrivacyPolicyQuery();

  React.useEffect(() => {
    if (isError) {
      dispatch(
        setToast({
          type: "warning",
          args: endpointName + "" + originalArgs,
          text: "Failed to load some data.",
        }),
      );
    }
  }, [isError]);

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Privacy Policy.</h2>

      <div className={`${s.container} ${cs.container} ${cs.container768}`}>
        <p className={s.title}>Privacy Policy</p>

        {!policy ? (
          <SkeletonPrivacyPolicyHeader />
        ) : (
          <span className={s.update}>{`Last updated on ${formatDate2(policy.updatedAt)}`}</span>
        )}
      </div>
    </section>
  );
};
