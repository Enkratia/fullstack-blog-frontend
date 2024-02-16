"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonTag.module.scss";

export const SkeletonTag: React.FC = () => {
  return <span className={`${s.tag} ${cs.skeleton}`}></span>;
};
