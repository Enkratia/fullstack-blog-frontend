"use client";

import React from "react";

import {
  useGetAboutUsStatisticQuery,
  useGetSubscribersCountQuery,
} from "../../../../redux/backendApi";
import { useAppDispatch } from "../../../../redux/store";
import { setToast } from "../../../../redux/toastSlice/slice";

import { SkeletonDashboardBlockStats } from "../../../../components";
import { formatStatistic } from "../../../../utils/customFunctions";

import cs from "../../../../scss/helpers.module.scss";
import s from "./dashboardBlockStats.module.scss";

export const DashboardBlockStats: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    data: statistic,
    isError: isError1,
    originalArgs: args1,
    endpointName: endpoint1,
  } = useGetAboutUsStatisticQuery();

  const {
    data: subscribeCount,
    isError: isError2,
    originalArgs: args2,
    endpointName: endpoint2,
  } = useGetSubscribersCountQuery();

  // **
  React.useEffect(() => {
    if (isError1 || isError2) {
      let typeCount = 0;
      let textCount = 0;
      const args = [];

      if (isError1) {
        typeCount += 1;
        textCount += 1;
        args.push(endpoint1 + "" + args1);
      }

      if (isError2) {
        typeCount += 1;
        textCount += 1;
        args.push(endpoint2 + "" + args2);
      }

      dispatch(
        setToast({
          type: Array(typeCount).fill("warning"),
          text: Array(textCount).fill("Failed to load data."),
          args,
        }),
      );
    }
  }, [isError1, isError2]);

  // **
  if (!statistic || !subscribeCount) {
    return <SkeletonDashboardBlockStats />;
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
