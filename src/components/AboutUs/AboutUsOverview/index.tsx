import React from "react";
import Image from "next/image";

import { fetchAboutUsStatisticQuery } from "../../../fetchApi/fetchApi";
import { formatStatistic } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./aboutUsOverview.module.scss";

// const aboutUsOverview: AboutUsOverviewType[] = [
//   {
//     type: "Blogs Published",
//     count: 12,
//   },
//   {
//     type: "Views on Finsweet",
//     count: 18500,
//   },
//   {
//     type: "Total active Users",
//     count: 30250,
//   },
// ];

type AboutUsOverviewProps = {
  data: AboutUsStaticType;
};

export const AboutUsOverview: React.FC<AboutUsOverviewProps> = async ({ data }) => {
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
