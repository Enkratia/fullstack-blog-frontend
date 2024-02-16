import React from "react";

import { TestimonialStatic, TestimonialsSlider } from "../../components";

import { fetchTestimonialStaticQuery } from "../../fetchApi/fetchApi";

import s from "./testimonials.module.scss";
import cs from "../../scss/helpers.module.scss";

export const Testimonials: React.FC = async () => {
  const { data, isError } = await fetchTestimonialStaticQuery();

  if (!data) {
    return;
  }

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Testimonials</h2>

      <div className={`${s.container} ${cs.container}`}>
        <TestimonialStatic />
        <TestimonialsSlider />
      </div>
    </section>
  );
};
