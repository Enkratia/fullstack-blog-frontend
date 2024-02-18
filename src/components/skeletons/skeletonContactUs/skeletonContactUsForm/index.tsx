"use client";

import React from "react";

import cs from "../../../../scss/helpers.module.scss";
import s from "./skeletonContactUsForm.module.scss";

export const SkeletonContactUsForm: React.FC = () => {
  return (
    <div className={s.root}>
      <span className={`${s.inputWrapper} ${cs.skeleton}`}></span>

      <span className={`${s.inputWrapper} ${cs.skeleton}`}></span>

      <span className={`${s.inputWrapper} ${cs.skeleton}`}></span>

      <span className={`${s.inputWrapper} ${cs.skeleton}`}></span>

      <span className={`${s.btnWrapper}  ${cs.skeleton}`}></span>
    </div>
  );
};
