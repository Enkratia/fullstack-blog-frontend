"use client";

import React from "react";
import { useParams } from "next/navigation";

import { useGetTestimonialByIdQuery } from "../../../../redux/backendApi";
import { useAppDispatch } from "../../../../redux/store";
import { setToast } from "../../../../redux/toastSlice/slice";

import { ChangeTestimonialEditForm, SkeletonDashboardForm } from "../../../../components";

import cs from "../../../../scss/helpers.module.scss";
import s from "./changeTestimonialEditBlock.module.scss";

export const ChangeTestimonialEditBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = useParams().id;

  const { data, isError, originalArgs, endpointName } = useGetTestimonialByIdQuery(+id);

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
      <h2 className={`${s.title} ${cs.title}`}>Edit testimonial</h2>

      {!data ? <SkeletonDashboardForm /> : <ChangeTestimonialEditForm testimonial={data} />}
    </section>
  );
};
