import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./aboutUsHeader.module.scss";

type AboutUsHeaderProps = {
  data: AboutUsStaticType;
};

export const AboutUsHeader: React.FC<AboutUsHeaderProps> = ({ data }) => {
  return (
    <div className={`${s.root} ${cs.containerAboutUs}`}>
      <div className={s.left}>
        <span className={s.subtitle}>About us</span>
        <p className={s.title}>{data.headerTitle}</p>
      </div>

      <div className={s.right}>{data.headerDescription}</div>
    </div>
  );
};
