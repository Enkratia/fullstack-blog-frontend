"use client";

import React from "react";

import cs from "../../../../scss/helpers.module.scss";
import s from "./skeletonAboutUsHeader.module.scss";

export const SkeletonAboutUsHeader: React.FC = () => {
  return (
    <div className={`${s.root} ${cs.containerAboutUs}`}>
      <div className={s.left}>
        <span className={`${s.subtitle} ${cs.skeleton}`}></span>
        <span className={`${s.title} ${cs.skeleton}`}></span>
      </div>

      <span className={`${s.right} ${cs.skeleton}`}></span>
    </div>
  );
};
