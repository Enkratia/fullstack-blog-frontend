import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./AboutUsVision.module.scss";

export const AboutUsVision: React.FC = () => {
  return (
    <div className={`${s.root} ${cs.containerAboutUs}`}>
      <div className={s.box}>
        <span className={s.subtitle}>Our mission</span>
        <p className={s.title}>Creating valuable content for creatives all around the world</p>
        <p className={s.descr}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris
          in aliquam sem. At risus viverra adipiscing at in tellus.
        </p>
      </div>

      <div className={s.box}>
        <span className={s.subtitle}>Our Vision</span>
        <p className={s.title}>A&nbsp;platform that empowers individuals to&nbsp;improve</p>
        <p className={s.descr}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris
          in aliquam sem. At risus viverra adipiscing at in tellus.
        </p>
      </div>
    </div>
  );
};
