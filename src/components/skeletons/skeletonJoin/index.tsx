"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonJoin.module.scss";

export const SkeletonJoin: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <div className={s.content}>
          <span className={`${s.title} ${cs.skeleton}`}></span>
          <span className={`${s.descr} ${cs.skeleton}`}></span>
          <span className={`${s.btn} ${cs.skeleton}`}></span>
        </div>
      </div>
    </div>
  );
};
