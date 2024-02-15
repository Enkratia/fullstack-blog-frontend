"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonHero.module.scss";

export const SkeletonHero: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <div className={s.content}>
          <span className={`${s.subtitle} ${cs.skeleton}`}></span>

          <span className={`${s.title} ${cs.skeleton}`}></span>

          <span className={`${s.metadata} ${cs.skeleton}`}></span>

          <span className={`${s.descr} ${cs.skeleton}`}></span>

          <span className={`${s.btn} ${cs.skeleton}`}></span>
        </div>
      </div>
    </div>
  );
};
