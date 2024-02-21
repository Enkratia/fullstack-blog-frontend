"use client";

import React from "react";

import useEmblaCarousel from "embla-carousel-react";
import autoplay from "embla-carousel-autoplay";

import { useGetFeaturedInQuery } from "../../redux/backendApi";
import { useAppDispatch } from "../../redux/store";
import { setToast } from "../../redux/toastSlice/slice";

import { Brand, SkeletonBrand } from "../../components";

import s from "./featuredIn.module.scss";
import cs from "../../scss/helpers.module.scss";

const limit = 10;
const page = 1;

export const FeaturedIn: React.FC = () => {
  const dispatch = useAppDispatch();

  const plugins = [autoplay()];
  const [emblaRef] = useEmblaCarousel(
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

  const { data, isError, isLoading, isFetching, endpointName, originalArgs } =
    useGetFeaturedInQuery(request);
  const brands = data?.data;

  const isReady = brands && brands.length;
  const isFailed = isError || (!brands?.length && !isLoading && !isFetching);

  // **
  React.useEffect(() => {
    if (isFailed) {
      dispatch(
        setToast({
          type: "warning",
          args: endpointName + "" + originalArgs,
          text: "Failed to load some data.",
        }),
      );
    }
  }, [isFailed]);

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
            {!isReady
              ? [...Array(5)].map((_, i) => (
                  <div key={i} className={s.slide}>
                    <SkeletonBrand />
                  </div>
                ))
              : brands.map((obj) => (
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
