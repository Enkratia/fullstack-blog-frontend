"use client";

import React from "react";

import cs from "../../../../scss/helpers.module.scss";
import s from "./skeletonDashboardViewMessages.module.scss";

export const SkeletonDashboardViewMessages: React.FC = () => {
  return <span className={`${s.field} ${cs.skeleton}`}></span>;
};
