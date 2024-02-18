import React, { Suspense } from "react";
import Image from "next/image";

import { fetchAboutUsStatisticQuery } from "../../../fetchApi/fetchApi";
import { formatStatistic } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./aboutUsOverview.module.scss";
import { SkeletonAboutUsOverview } from "@/components";

type AboutUsOverviewProps = {
  data: AboutUsStaticType;
};

const AboutUsOverviewSuspense: React.FC<AboutUsOverviewProps> = async ({ data }) => {
  const { data: statistic, isError } = await fetchAboutUsStatisticQuery();

  if (!statistic) {
    return;
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
        sizes="100vw"
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
