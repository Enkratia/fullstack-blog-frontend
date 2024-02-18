"use client";

import React from "react";

import { SkeletonText } from "../../../components";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonPost.module.scss";

export const SkeletonPost: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={`${s.head} ${cs.container} ${cs.container768}`}>
          <div className={s.user}>
            <span className={`${s.userImageWrapper} ${cs.skeleton}`}></span>

            <div className={s.userData}>
              <span className={`${s.userFullname} ${cs.skeleton}`}></span>
              <span className={`${s.userDate} ${cs.skeleton}`}></span>
            </div>
          </div>

          <span className={`${s.title} ${cs.skeleton}`}></span>

          <span className={`${s.category} ${cs.skeleton}`}></span>
        </div>

        <span className={`${s.imageWrapper} ${cs.container} ${cs.skeleton}`}></span>

        <div className={`${cs.article} ${cs.container} ${cs.container836}`}>
          <SkeletonText />
        </div>
      </div>
    </div>
  );
};
