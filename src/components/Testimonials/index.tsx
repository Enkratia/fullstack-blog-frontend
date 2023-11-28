import React from "react";

import { TestimonialsSlider } from "../../components";

import { fetchTestimonialStaticQuery } from "@/fetchApi/fetchApi";

import s from "./testimonials.module.scss";
import cs from "../../scss/helpers.module.scss";

// const data: TestimonialStaticType = {
//   subtitle: "Testimonials",
//   title: "What people say about our blog",
//   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
// };

export const Testimonials: React.FC = async () => {
  const { data, isError } = await fetchTestimonialStaticQuery();

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Testimonials</h2>

      <div className={`${s.container} ${cs.container}`}>
        <div className={s.left}>
          <span className={s.subtitle}>{data.subtitle}</span>
          <p className={s.title}>{data.title}</p>
          <p className={s.descr}>{data.description}</p>
        </div>

        <TestimonialsSlider />
      </div>
    </section>
  );
};
