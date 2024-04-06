import React, { Suspense } from "react";
import Image from "next/image";

import { fetchAboutUsStatisticQuery } from "../../../fetchApi/fetchApi";

import { SkeletonAboutUsOverview, ToastComponent } from "../../../components";
import { formatStatistic } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./aboutUsOverview.module.scss";

type AboutUsOverviewProps = {
  data: AboutUsStaticType;
};

const AboutUsOverviewSuspense: React.FC<AboutUsOverviewProps> = async ({ data }) => {
  const { data: statistic, args } = await fetchAboutUsStatisticQuery();

  if (!statistic) {
    return (
      <>
        <SkeletonAboutUsOverview />
        <ToastComponent type="warning" args={args} text="Failed to load some data." />
      </>
    );
  }

  return (
    <div className={`${s.root} ${cs.containerAboutUs}`}>
      <Image
        className={s.image}
        src={data.imageUrl}
        fill
        alt="Picture for 'About Us' section."
        aria-hidden="true"
        priority={true}
        sizes="1280px"
      />

      <ul className={s.overview}>
        {statistic.map((obj, i) => (
          <li key={i} className={cs.statisticItem}>
            <span className={cs.statisticData}>{formatStatistic(obj.count)}</span>
            <span className={cs.statisticDescr}>{obj.type}</span>
          </li>
        ))}
      </ul>

      <div className={`${s.decoration} ${cs.decoration}`}>
        <span className={`${cs.decorationItem} ${cs.decorationItemPurple}`}></span>
        <span className={`${cs.decorationItem} ${cs.decorationItemPurple}`}></span>
        <span className={`${cs.decorationItem} ${cs.decorationItemPurple}`}></span>
      </div>
    </div>
  );
};

// **
export const AboutUsOverview: React.FC<AboutUsOverviewProps> = async ({ data }) => (
  <Suspense fallback={<SkeletonAboutUsOverview />}>
    <AboutUsOverviewSuspense data={data} />
  </Suspense>
);
