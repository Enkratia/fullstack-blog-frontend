"use client";

import React from "react";

import cs from "../../../../scss/helpers.module.scss";
import s from "./skeletonDashboardQuery.module.scss";

export const SkeletonDashboardQuery: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.btns}>
        <span className={`${s.btn} ${cs.skeleton}`}></span>
        <span className={`${s.btn} ${cs.skeleton}`}></span>
      </div>

      <span className={`${s.input} ${cs.skeleton}`}></span>
    </div>
  );
};
