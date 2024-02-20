import React, { Suspense } from "react";

import { fetchAboutUsStaticQuery } from "../../fetchApi/fetchApi";

import { AboutUsHeader, AboutUsOverview, AboutUsVision, SkeletonAboutUs } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./aboutUs.module.scss";

const AboutUsSuspense: React.FC = async () => {
  const { data, isError } = await fetchAboutUsStaticQuery();

  if (!data) {
    return;
  }

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Information about us.</h2>

      <div className={`${s.container} ${cs.container}`}>
        <AboutUsHeader data={data} />
        <AboutUsOverview data={data} />
        <AboutUsVision data={data} />
      </div>
    </section>
  );
};

// **
export const AboutUs: React.FC = async () => (
  <Suspense fallback={<SkeletonAboutUs />}>
    <AboutUsSuspense />
  </Suspense>
);
