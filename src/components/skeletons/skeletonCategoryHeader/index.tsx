"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonCategoryHeader.module.scss";

export const SkeletonCategoryHeader: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <span className={`${s.title} ${cs.skeleton}`}></span>

        <span className={`${s.descr} ${cs.skeleton}`}></span>

        <span className={`${s.breadcrumbs} ${cs.skeleton}`}></span>
      </div>
    </div>
  );
};
