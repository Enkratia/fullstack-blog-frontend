import React, { Suspense } from "react";

import { fetchTestimonialStaticQuery } from "../../../fetchApi/fetchApi";

import { SkeletonTestimonialsStatic, ToastComponent } from "../../../components";

import s from "./testimonialsStatic.module.scss";

const TestimonialStaticSuspense: React.FC = async () => {
  const { data, args } = await fetchTestimonialStaticQuery();

  if (!data) {
    return (
      <>
        <SkeletonTestimonialsStatic />
        <ToastComponent type="warning" args={args} text="Failed to load some data." />
      </>
    );
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
