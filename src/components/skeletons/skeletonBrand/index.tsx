"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonBrand.module.scss";

export const SkeletonBrand: React.FC = () => {
  return (
    <div className={s.root}>
      <span className={`${s.link} ${cs.skeleton}`}></span>
    </div>
  );
};
