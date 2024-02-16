"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonBlogHeader.module.scss";

export const SkeletonBlogHeader: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <div className={s.left}>
          <span className={`${s.subtitle} ${cs.skeleton}`}></span>

          <span className={`${s.title} ${cs.skeleton}`}></span>

          <span className={`${s.metadata} ${cs.skeleton}`}></span>

          <span className={`${s.text} ${cs.skeleton}`}></span>

          <span className={`${s.link} ${cs.skeleton}`}></span>
        </div>

        <div className={s.right}>
          <span className={`${s.imageWrapper} ${cs.skeleton}`}></span>
        </div>
      </div>
    </div>
  );
};
