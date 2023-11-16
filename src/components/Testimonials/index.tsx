import React from "react";

import { TestimonialsSlider } from "../../components";

import s from "./Testimonials.module.scss";
import cs from "../../scss/helpers.module.scss";

export const Testimonials: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Testimonials</h2>

      <div className={`${s.container} ${cs.container}`}>
        <div className={s.left}>
          <span className={s.subtitle}>Testimonials</span>
          <p className={s.title}>What people say about our blog</p>
          <p className={s.descr}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </p>
        </div>

        <TestimonialsSlider />
      </div>
    </section>
  );
};
