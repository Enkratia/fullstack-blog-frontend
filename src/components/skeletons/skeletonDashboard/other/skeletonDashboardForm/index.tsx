"use client";

import React from "react";

import cs from "../../../../../scss/helpers.module.scss";
import s from "./skeletonDashboardForm.module.scss";

export const SkeletonDashboardForm: React.FC = () => {
  return (
    <div className={s.root}>
      <span className={`${s.title} ${cs.skeleton}`}></span>

      <div className={s.form}>
        <div className={s.content}>
          <span className={`${s.input} ${cs.skeleton}`}></span>

          <span className={`${s.input} ${cs.skeleton}`}></span>

          <span className={`${s.input} ${cs.skeleton}`}></span>

          <span className={`${s.btn} ${cs.skeleton}`}></span>
        </div>
      </div>
    </div>
  );
};
