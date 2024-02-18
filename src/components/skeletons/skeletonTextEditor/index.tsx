"use client";

import React from "react";

import { SkeletonText } from "../../../components";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonTextEditor.module.scss";

export const SkeletonTextEditor: React.FC = () => {
  return (
    <div className={`${s.root} ${cs.inputWrapper}`}>
      <div className={`${s.bar} ${cs.input}`}>
        <div>
          {[...Array(9)].map((_, i) => (
            <span key={i} className={`${s.barBtn} ${cs.skeleton}`}></span>
          ))}
        </div>

        <div>
          <span className={`${s.barBtn} ${cs.skeleton}`}></span>
          <span className={`${s.barBtn} ${cs.skeleton}`}></span>
        </div>
      </div>

      <div className={`${s.content} ${cs.article} ${cs.input}`}></div>
    </div>
  );
};
