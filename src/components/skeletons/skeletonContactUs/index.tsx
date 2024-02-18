"use client";

import React from "react";

import { SkeletonContactUsForm } from "../../../components";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonContactUs.module.scss";

export const SkeletonContactUs: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={`${s.container} ${cs.container} ${cs.container768}`}>
        <div className={s.header}>
          <span className={`${s.headerSubtitle} ${cs.skeleton}`}></span>

          <span className={`${s.headerTitle} ${cs.skeleton}`}></span>

          <span className={`${s.headerDescr} ${cs.skeleton}`}></span>
        </div>

        <div className={s.info}>
          <div className={s.box}>
            <span className={`${s.boxTitle} ${cs.skeleton}`}></span>

            <span className={`${s.boxItem} ${cs.skeleton}`}></span>

            <span className={`${s.boxItem} ${cs.skeleton}`}></span>

            <span className={`${s.boxItem} ${cs.skeleton}`}></span>
          </div>

          <div className={s.box}>
            <span className={`${s.boxTitle} ${cs.skeleton}`}></span>

            <span className={`${s.boxItem} ${cs.skeleton}`}></span>

            <span className={`${s.boxItem} ${cs.skeleton}`}></span>
          </div>
        </div>

        <SkeletonContactUsForm />
      </div>
    </div>
  );
};
