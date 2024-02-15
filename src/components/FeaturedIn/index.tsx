"use client";

import React from "react";

import useEmblaCarousel from "embla-carousel-react";
import autoplay from "embla-carousel-autoplay";

import { useGetFeaturedInQuery } from "../../redux/backendApi";

import { Brand } from "../../components";

import s from "./featuredIn.module.scss";
import cs from "../../scss/helpers.module.scss";

const limit = 5;
const page = 1;

export const FeaturedIn: React.FC = () => {
  const plugins = [autoplay()];
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      active: false,
      loop: true,
      align: "start",
      breakpoints: {
        "(max-width: 1325px)": {
          active: true,
        },
      },
    },
    plugins,
  );

  const request = `?_page=${page}&_limit=${limit}`;

  const { data, isError } = useGetFeaturedInQuery(request);
  const brands = data?.data;

  if (!brands) {
    return;
  }

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Places where we featured in.</h2>

      <div className={`${s.container} ${cs.container}`}>
        <div className={s.text}>
          <span className={s.textTop}>We are</span>
          <span className={s.textBottom}>Featured in</span>
        </div>

        <div className={s.sliderWrapper} ref={emblaRef}>
          <div className={s.slider}>
            {brands.map((obj) => (
              <div key={obj.id} className={s.slide}>
                <Brand obj={obj} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
