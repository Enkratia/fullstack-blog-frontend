import React from "react";

import { AboutUsHeader, AboutUsOverview, AboutUsVision } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./AboutUs.module.scss";

export const AboutUs: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Information about us.</h2>

      <div className={`${s.container} ${cs.container}`}>
        <AboutUsHeader />
        <AboutUsOverview />
        <AboutUsVision />
      </div>
    </section>
  );
};
