"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonFooterBottom.module.scss";

export const SkeletonFooterBottom: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.info}>
        <span className={`${s.street} ${cs.skeleton}`}></span>
        <span className={`${s.email} ${cs.skeleton}`}></span>
        <span className={`${s.phone} ${cs.skeleton}`}></span>
      </div>

      <div className={s.social}>
        {[...Array(4)].map((_, i) => (
          <span key={i} className={`${s.socialItem} ${cs.skeleton}`}></span>
        ))}
      </div>
    </div>
  );
};
