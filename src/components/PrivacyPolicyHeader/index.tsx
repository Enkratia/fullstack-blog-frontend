"use client";

import React from "react";

import { useGetPrivacyPolicyQuery } from "../../redux/backendApi";

import { formatDate2 } from "../../utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./privacyPolicyHeader.module.scss";
import { SkeletonPrivacyPolicyHeader } from "../skeletons/skeletonPrivacyPolicyHeader";

export const PrivacyPolicyHeader: React.FC = () => {
  const { data: policy, isError } = useGetPrivacyPolicyQuery();

  console.log("2", useGetPrivacyPolicyQuery());

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
