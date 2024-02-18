"use client";

import React from "react";

import cs from "../../../../scss/helpers.module.scss";
import s from "./skeletonDashboardViewMessage.module.scss";

export const SkeletonDashboardViewMessage: React.FC = () => {
  return (
    <div className={s.root}>
      <span className={`${s.title} ${cs.skeleton}`}></span>

      <div className={s.content}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={s.field}>
            <span className={`${s.fieldName} ${cs.skeleton}`}></span>
            <span className={`${s.fieldValue} ${cs.skeleton}`}></span>
          </div>
        ))}
      </div>
    </div>
  );
};
