"use client";

import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonPrivacyPolicyHeader.module.scss";

export const SkeletonPrivacyPolicyHeader: React.FC = () => {
  return <span className={`${s.update} ${cs.skeleton}`}></span>;
};
