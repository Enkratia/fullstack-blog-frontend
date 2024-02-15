"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonFeaturedPosts.module.scss";

export const SkeletonFeaturedPosts: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <div className={s.featured}>
          <div className={`${s.featuredTitle} ${cs.skeleton}`}></div>

          <div className={s.featuredContent}>
            <div className={s.featuredImageWrapper}>
              <div className={`${s.featuredImageWrapperInner} ${cs.skeleton}`}></div>
            </div>

            <div className={`${s.featuredMetadata} ${cs.skeleton}`}></div>

            <div className={`${s.featuredTitleSecond} ${cs.skeleton}`}></div>

            <div className={`${s.featuredDescr} ${cs.skeleton}`}></div>

            <div className={`${s.btn} ${cs.skeleton}`}></div>
          </div>
        </div>

        <div className={s.all}>
          <div className={s.allHead}>
            <div className={`${s.allTitle} ${cs.skeleton}`}></div>

            <div className={`${s.allView} ${cs.skeleton}`}></div>
          </div>

          <div className={s.allList}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={s.allItem}>
                <div className={`${s.allItemData} ${cs.skeleton}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
