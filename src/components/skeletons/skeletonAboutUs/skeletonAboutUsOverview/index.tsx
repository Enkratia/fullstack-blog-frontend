"use client";

import React from "react";

import cs from "../../../../scss/helpers.module.scss";
import s from "./skeletonAboutUsOverview.module.scss";

export const SkeletonAboutUsOverview: React.FC = () => {
  return (
    <div className={`${s.root} ${cs.containerAboutUs}`}>
      <div className={s.overview}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className={s.statisticItem}>
            <span className={`${s.statisticData} ${cs.skeleton}`}></span>
            <span className={`${s.statisticDescr} ${cs.skeleton}`}></span>
          </div>
        ))}
      </div>

      <div className={`${s.decoration}`}></div>
    </div>
  );
};
