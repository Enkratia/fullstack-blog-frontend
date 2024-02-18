"use client";

import React from "react";

import cs from "../../../../scss/helpers.module.scss";
import s from "./skeletonText.module.scss";

export const SkeletonText: React.FC = () => {
  return (
    <div className={s.root}>
      <span className={`${s.title} ${cs.skeleton}`}></span>

      <div className={s.paragraph}>
        {[...Array(10)].map((_, i) => (
          <span key={i} className={`${s.line} ${cs.skeleton}`}></span>
        ))}
      </div>
    </div>
  );
};
