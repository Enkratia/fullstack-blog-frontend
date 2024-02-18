"use client";

import React from "react";

import cs from "../../../../scss/helpers.module.scss";
import s from "./skeletonDashboardBlockStats.module.scss";

export const SkeletonDashboardBlockStats: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.list}>
        {[...Array(4)].map((_, i) => (
          <span key={i} className={`${s.item} ${cs.skeleton}`}></span>
        ))}
      </div>
    </div>
  );
};
