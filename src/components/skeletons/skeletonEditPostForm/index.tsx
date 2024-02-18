"use client";

import React from "react";

import { SkeletonTextEditor } from "../../../components";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonEditPostForm.module.scss";

export const SkeletonEditPostForm: React.FC = () => {
  return (
    <div className={s.root}>
      <span className={`${s.input} ${cs.skeleton}`}></span>

      <span className={`${s.input} ${cs.skeleton}`}></span>

      <span className={`${s.upload} ${cs.skeleton}`}></span>

      <SkeletonTextEditor />

      <span className={`${s.input} ${cs.skeleton}`}></span>

      <span className={`${s.btn} ${cs.skeleton}`}></span>
    </div>
  );
};
