"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonWhyThisBlog.module.scss";

export const SkeletonWhyThisBlog: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <div className={s.imageWrapper}>
          <span className={`${s.imageWrapperInner} ${cs.skeleton}`}></span>
        </div>

        <div className={s.text}>
          <span className={`${s.title} ${cs.skeleton}`}></span>
          <span className={`${s.subtitle} ${cs.skeleton}`}></span>
          <span className={`${s.description} ${cs.skeleton}`}></span>
        </div>
      </div>
    </div>
  );
};
