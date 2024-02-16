import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./skeletonTestimonialsStatic.module.scss";

export const SkeletonTestimonialsStatic: React.FC = () => {
  return (
    <div className={s.root}>
      <span className={`${s.subtitle} ${cs.skeleton}`}></span>
      <span className={`${s.title} ${cs.skeleton}`}></span>
      <span className={`${s.descr} ${cs.skeleton}`}></span>
    </div>
  );
};
