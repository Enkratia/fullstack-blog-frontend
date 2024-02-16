"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonTestimonial.module.scss";

export const SkeletonTestimonial: React.FC = () => {
  return (
    <div className={s.item}>
      <div className={s.textWrapper}>
        <span className={`${s.text} ${cs.skeleton}`}></span>
      </div>

      <div className={s.info}>
        <span className={`${s.imageWrapper} ${cs.skeleton}`}></span>

        <div className={s.bottom}>
          <div className={s.metadata}>
            <span className={`${s.fullname} ${cs.skeleton}`}></span>
            <span className={`${s.address} ${cs.skeleton}`}></span>
          </div>
        </div>
      </div>
    </div>
  );
};
