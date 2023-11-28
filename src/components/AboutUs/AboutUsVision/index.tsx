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
        <p className={s.title}>{data.mission.title}</p>
        <p className={s.descr}>{data.mission.description}</p>
      </div>

      <div className={s.box}>
        <span className={s.subtitle}>Our Vision</span>
        <p className={s.title}>{data.vision.title}</p>
        <p className={s.descr}>{data.vision.description}</p>
      </div>
    </div>
  );
};
