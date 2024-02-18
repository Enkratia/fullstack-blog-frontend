"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonProfileForm.module.scss";

export const SkeletonProfileForm: React.FC = () => {
  return (
    <form className={s.root}>
      <div className={s.inputs}>
        <span className={`${s.input} ${cs.skeleton}`}></span>
        <span className={`${s.input} ${cs.skeleton}`}></span>
        <span className={`${s.input} ${cs.skeleton}`}></span>
        <span className={`${s.input} ${cs.skeleton}`}></span>
        <span className={`${s.input} ${cs.skeleton}`}></span>
        <span className={`${s.input} ${cs.skeleton}`}></span>
        <span className={`${s.upload} ${cs.skeleton}`}></span>
      </div>

      <div className={s.inputs}>
        <span className={`${s.input} ${cs.skeleton}`}></span>
        <span className={`${s.input} ${cs.skeleton}`}></span>
        <span className={`${s.input} ${cs.skeleton}`}></span>
        <span className={`${s.input} ${cs.skeleton}`}></span>
      </div>

      <span className={`${s.textarea} ${cs.skeleton}`}></span>

      <span className={`${s.btn} ${cs.skeleton}`}></span>
    </form>
  );
};
