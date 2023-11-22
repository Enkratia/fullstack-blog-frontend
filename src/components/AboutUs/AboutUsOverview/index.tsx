import React from "react";

import cs from "../../../scss/helpers.module.scss";
import s from "./AboutUsOverview.module.scss";

const aboutUsOverview: AboutUsOverviewType[] = [
  {
    type: "Blogs Published",
    count: 12,
  },
  {
    type: "Views on Finsweet",
    count: 18500,
  },
  {
    type: "Total active Users",
    count: 30250,
  },
];

export const AboutUsOverview: React.FC = () => {
  const formatData = (count: number) => {
    let formattedCount = "";

    if (count > 999999) {
      formattedCount = ~~(count / 1000 / 1000) + "K+";
      return formattedCount;
    }

    if (count > 999) {
      formattedCount = ~~(count / 1000) + "K+";
      return formattedCount;
    }

    formattedCount = count + "+";
    return formattedCount;
  };

  return (
    <div className={`${s.root} ${cs.containerAboutUs}`}>
      <ul className={s.overview}>
        {aboutUsOverview.map((obj, i) => (
          <li key={i} className={s.overviewItem}>
            <span className={s.overviewData}>{formatData(obj.count)}</span>
            <span className={s.overviewDescr}>{obj.type}</span>
          </li>
        ))}
      </ul>

      <div className={cs.decoration}>
        <span className={`${cs.decorationItem} ${cs.decorationItemPurple}`}></span>
        <span className={`${cs.decorationItem} ${cs.decorationItemPurple}`}></span>
        <span className={`${cs.decorationItem} ${cs.decorationItemPurple}`}></span>
      </div>
    </div>
  );
};
