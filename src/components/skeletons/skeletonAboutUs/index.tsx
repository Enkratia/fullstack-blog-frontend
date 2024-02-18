"use client";

import React from "react";

import {
  SkeletonAboutUsHeader,
  SkeletonAboutUsOverview,
  SkeletonAboutUsVision,
} from "../../../components";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonAboutUs.module.scss";

export const SkeletonAboutUs: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <SkeletonAboutUsHeader />
        <SkeletonAboutUsOverview />
        <SkeletonAboutUsVision />
      </div>
    </div>
  );
};
