"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonUsMission.module.scss";

export const SkeletonUsMission: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <div className={s.decoration}></div>

        <div className={s.content}>
          <div className={s.us}>
            <span className={`${s.subtitle} ${cs.skeleton}`}></span>

            <span className={`${s.title} ${cs.skeleton}`}></span>

            <span className={`${s.descr} ${s.descrMargin} ${cs.skeleton}`}></span>

            <span className={`${s.btn} ${cs.skeleton}`}></span>
          </div>

          <div className={s.mission}>
            <span className={`${s.subtitle} ${cs.skeleton}`}></span>

            <span className={`${s.missionTitle} ${cs.skeleton}`}></span>

            <span className={`${s.descr} ${s.descrV2} ${cs.skeleton}`}></span>
          </div>
        </div>
      </div>
    </div>
  );
};
