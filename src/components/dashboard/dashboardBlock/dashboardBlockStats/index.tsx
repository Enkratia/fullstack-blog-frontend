"use client";

import React from "react";

import {
  useGetAboutUsStatisticQuery,
  useGetSubscribersCountQuery,
} from "../../../../redux/backendApi";

import { formatStatistic } from "../../../../utils/customFunctions";

import cs from "../../../../scss/helpers.module.scss";
import s from "./dashboardBlockStats.module.scss";

export const DashboardBlockStats: React.FC = () => {
  const { data: statistic, isError: isStatisticError } = useGetAboutUsStatisticQuery();
  const { data: subscribeCount, isError: isSubscribeCountError } = useGetSubscribersCountQuery();

  if (!statistic || !subscribeCount) {
    return;
  }

  return (
    <div className={s.root}>
      <ul className={s.list}>
        <li className={`${s.item} ${cs.statisticItem}`}>
          <span className={cs.statisticData}>{formatStatistic(subscribeCount.count)}</span>
          <span className={cs.statisticDescr}>{subscribeCount.type}</span>
        </li>

        {statistic.map((item, i) => (
          <li key={i} className={`${s.item} ${cs.statisticItem}`}>
            <span className={cs.statisticData}>{formatStatistic(item.count)}</span>
            <span className={cs.statisticDescr}>{item.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
