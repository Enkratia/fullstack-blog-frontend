"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonAuthorCard.module.scss";

export const SkeletonAuthorCard: React.FC = () => {
  return (
    <div className={s.root}>
      <span className={`${s.imageWrapper} ${cs.skeleton}`}></span>

      <span className={`${s.fullname} ${cs.skeleton}`}></span>

      <span className={`${s.info} ${cs.skeleton}`}></span>

      <div className={s.social}>
        {[...Array(4)].map((_, i) => (
          <span key={i} className={`${s.socialItem} ${cs.skeleton}`}></span>
        ))}
      </div>
    </div>
  );
};
