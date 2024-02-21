import React from "react";

import { TestimonialStatic, TestimonialsSlider } from "../../components";

import s from "./testimonials.module.scss";
import cs from "../../scss/helpers.module.scss";

export const Testimonials: React.FC = async () => {
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
