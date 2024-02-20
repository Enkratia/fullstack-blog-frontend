import React, { Suspense } from "react";

import { fetchTestimonialStaticQuery } from "../../../fetchApi/fetchApi";

import { SkeletonTestimonialsStatic } from "../../../components";

import s from "./testimonialsStatic.module.scss";

const TestimonialStaticSuspense: React.FC = async () => {
  const { data, isError } = await fetchTestimonialStaticQuery();

  if (!data) {
    return;
  }

  return (
    <div className={s.root}>
      <span className={s.subtitle}>{data.subtitle}</span>
      <p className={s.title}>{data.title}</p>
      <p className={s.descr}>{data.description}</p>
    </div>
  );
};

// **
export const TestimonialStatic: React.FC = async () => {
  return (
    <Suspense fallback={<SkeletonTestimonialsStatic />}>
      <TestimonialStaticSuspense />
    </Suspense>
  );
};
