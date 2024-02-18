"use client";

import React from "react";

import { SkeletonTextEditor } from "../../../../components";

import cs from "../../../../scss/helpers.module.scss";
import s from "./skeletonDashboardPrivacyPolicy.module.scss";

export const SkeletonDashboardPrivacyPolicy: React.FC = () => {
  return (
    <div className={s.root}>
      <span className={`${s.title} ${cs.skeleton}`}></span>

      <div className={s.wrapper}>
        <SkeletonTextEditor />
      </div>

      <span className={`${s.btn} ${cs.skeleton}`}></span>
    </div>
  );
};
