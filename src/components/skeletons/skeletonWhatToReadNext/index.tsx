"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonWhatToReadNext.module.scss";

export const SkeletonWhatToReadNext: React.FC = () => {
  return (
    <div className={s.slideWrapper}>
      <div className={s.slide}>
        <span className={`${s.imageWrapper} ${cs.skeleton}`}></span>

        <span className={`${s.metadata} ${cs.skeleton}`}></span>

        <span className={`${s.title} ${cs.skeleton}`}></span>

        <span className={`${s.descr} ${cs.skeleton}`}></span>
      </div>
    </div>
  );
};
