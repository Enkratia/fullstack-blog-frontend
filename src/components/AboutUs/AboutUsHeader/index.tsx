import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./AboutUsHeader.module.scss";

export const AboutUsHeader: React.FC = () => {
  return (
    <div className={`${s.root} ${cs.containerAboutUs}`}>
      <div className={s.left}>
        <span className={s.subtitle}>About us</span>
        <p className={s.title}>We are a team of content writers who share their learnings</p>
      </div>

      <div className={s.right}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </div>
    </div>
  );
};
