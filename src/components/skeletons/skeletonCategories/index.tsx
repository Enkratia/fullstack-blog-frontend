"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeleonCategories.module.scss";

export const SkeletonCategories: React.FC = () => {
  return (
    <div className={s.root}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className={s.category}>
          <span className={`${s.icon} ${cs.skeleton}`}></span>
          <span className={`${s.title} ${cs.skeleton}`}></span>
          <span className={`${s.descr} ${cs.skeleton}`}></span>
        </div>
      ))}
    </div>
  );
};
