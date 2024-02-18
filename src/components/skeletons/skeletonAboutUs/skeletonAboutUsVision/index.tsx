"use client";

import React from "react";

import cs from "../../../../scss/helpers.module.scss";
import s from "./skeletonAboutUsVision.module.scss";

export const SkeletonAboutUsVision: React.FC = () => {
  return (
    <div className={`${s.root} ${cs.containerAboutUs}`}>
      <div className={s.box}>
        <span className={`${s.subtitle} ${cs.skeleton}`}></span>
        <span className={`${s.title} ${cs.skeleton}`}></span>
        <span className={`${s.descr} ${cs.skeleton}`}></span>
      </div>

      <div className={s.box}>
        <span className={`${s.subtitle} ${cs.skeleton}`}></span>
        <span className={`${s.title} ${cs.skeleton}`}></span>
        <span className={`${s.descr} ${cs.skeleton}`}></span>
      </div>
    </div>
  );
};
