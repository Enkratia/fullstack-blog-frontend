"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonArticle.module.scss";

type SkeletonArticleProps = {
  isCategoryPage?: boolean;
  isArticlePage?: boolean;
};

export const SkeletonArticle: React.FC<SkeletonArticleProps> = ({
  isCategoryPage,
  isArticlePage,
}) => {
  return (
    <div
      className={`${s.root} ${isCategoryPage ? s.rootCategoryPage : ""} ${
        isArticlePage ? s.rootArticlePage : ""
      }`}>
      <div className={s.imageWrapper}>
        <span
          className={`${s.imageWrapperInner} ${
            isCategoryPage ? s.imageWrapperInnerCategoryPage : ""
          } ${isArticlePage ? s.imageWrapperInnerArticlePage : ""} ${cs.skeleton}`}></span>
      </div>

      <div className={s.data}>
        <span className={`${s.dataCategory} ${cs.skeleton}`}></span>

        <span className={`${s.dataTitle} ${cs.skeleton}`}></span>

        <span
          className={`${s.dataText} ${isCategoryPage ? s.dataTextCategoryPage : ""}  ${
            cs.skeleton
          }`}></span>
      </div>
    </div>
  );
};
