import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./aboutUsVision.module.scss";

type AboutUsVisionProps = {
  data: AboutUsStaticType;
};

export const AboutUsVision: React.FC<AboutUsVisionProps> = ({ data }) => {
  return (
    <div className={`${s.root} ${cs.containerAboutUs}`}>
      <div className={s.box}>
        <span className={s.subtitle}>Our mission</span>
        <p className={s.title}>{data.missionTitle}</p>
        <p className={s.descr}>{data.missionDescription}</p>
      </div>

      <div className={s.box}>
        <span className={s.subtitle}>Our Vision</span>
        <p className={s.title}>{data.visionTitle}</p>
        <p className={s.descr}>{data.visionDescription}</p>
      </div>
    </div>
  );
};
