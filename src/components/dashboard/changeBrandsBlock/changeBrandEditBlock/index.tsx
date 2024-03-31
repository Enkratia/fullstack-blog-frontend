"use client";

import React from "react";
import { useParams } from "next/navigation";

import { useGetBrandByIdQuery } from "../../../../redux/backendApi";
import { useAppDispatch } from "../../../../redux/store";
import { setToast } from "../../../../redux/toastSlice/slice";

import { ChangeBrandEditForm, SkeletonDashboardForm } from "../../../../components";

import cs from "../../../../scss/helpers.module.scss";
import s from "./changeBrandEditBlock.module.scss";

export const ChangeBrandEditBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = useParams().id;

  const { data, isError, originalArgs, endpointName } = useGetBrandByIdQuery(+id);

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

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Edit brand</h2>

      {!data ? <SkeletonDashboardForm /> : <ChangeBrandEditForm data={data} />}
    </section>
  );
};
