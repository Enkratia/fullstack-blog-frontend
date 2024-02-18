"use client";

import React from "react";

import { SkeletonText } from "../../../components";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonPrivacyPolicy.module.scss";

export const SkeletonPrivacyPolicy: React.FC = () => {
  return (
    <section className={s.root}>
      <article className={`${cs.article} ${cs.container} ${cs.container768}`}>
        <span className={`${s.title} ${cs.skeleton}`}></span>

        <div className={s.paragraph}>
          {[...Array(10)].map((_, i) => (
            <span key={i} className={`${s.line} ${cs.skeleton}`}></span>
          ))}
        </div>

        <span className={`${s.title} ${cs.skeleton}`}></span>

        <div className={s.paragraph}>
          {[...Array(10)].map((_, i) => (
            <span key={i} className={`${s.line} ${cs.skeleton}`}></span>
          ))}
        </div>
      </article>
    </section>
  );
};
