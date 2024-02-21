"use client";

import React from "react";
import { useParams } from "next/navigation";

import { useGetContactUsMessageByIdQuery } from "../../../redux/backendApi";
import { useAppDispatch } from "../../../redux/store";
import { setToast } from "../../../redux/toastSlice/slice";

import { SkeletonDashboardViewMessage } from "../../../components";
import { formatEmailDate } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./viewMessageBlock.module.scss";

export const ViewMessageBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = useParams().id.toString();

  const {
    data: message,
    isError,
    endpointName,
    originalArgs,
  } = useGetContactUsMessageByIdQuery(id);

  // **
  React.useEffect(() => {
    if (isError) {
      dispatch(
        setToast({
          type: "warning",
          args: endpointName + "" + originalArgs,
          text: "Failed to load data.",
        }),
      );
    }
  }, [isError]);

  // **
  if (!message) {
    return <SkeletonDashboardViewMessage />;
  }

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Message #{id}</h2>

      <div className={s.content}>
        <div className={s.field}>
          <span className={s.fieldName}>When:</span>
          <span className={s.fieldValue}>{formatEmailDate(message.createdAt)}</span>
        </div>

        <div className={s.field}>
          <span className={s.fieldName}>From:</span>
          <span className={s.fieldValue}>{message.fullname}</span>
        </div>

        <div className={s.field}>
          <span className={s.fieldName}>Email:</span>
          <span className={s.fieldValue}>{message.email}</span>
        </div>

        <div className={s.field}>
          <span className={s.fieldName}>Query:</span>
          <span className={s.fieldValue}>{message.query}</span>
        </div>

        <div className={s.field}>
          <span className={s.fieldName}>Message:</span>
          <span className={s.fieldValue}>{message.message}</span>
        </div>
      </div>
    </section>
  );
};
