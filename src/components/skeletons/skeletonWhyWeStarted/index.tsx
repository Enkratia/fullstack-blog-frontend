"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonWhyWeStarted.module.scss";

export const SkeletonWhyWeStarted: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <div className={s.coincidenceBlock1}></div>
        <div className={s.coincidenceBlock2}></div>
        <div className={s.coincidenceBlock3}></div>

        <div className={s.imageWrapper}></div>

        <div className={s.content}>
          <span className={`${s.subtitle} ${cs.skeleton}`}></span>
          <span className={`${s.title} ${cs.skeleton}`}></span>
          <span className={`${s.descr} ${cs.skeleton}`}></span>
          <span className={`${s.btn} ${cs.skeleton}`}></span>
        </div>
      </div>
    </div>
  );
};
