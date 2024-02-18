"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonAuthorHeader.module.scss";

export const SkeletonAuthorHeader: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={`${s.container} ${cs.container} ${cs.container1024}`}>
        <div className={s.imageWrapper}>
          <span className={`${s.imageWrapperInner} ${cs.skeleton}`}></span>
        </div>

        <div className={s.text}>
          <span className={`${s.title} ${cs.skeleton}`}></span>

          <span className={`${s.descr} ${cs.skeleton}`}></span>

          <span className={s.social}>
            {[...Array(4)].map((_, i) => {
              return <span key={i} className={`${s.socialItem} ${cs.skeleton}`}></span>;
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
