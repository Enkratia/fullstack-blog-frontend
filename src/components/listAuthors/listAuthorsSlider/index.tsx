"use client";

import React from "react";

import useEmblaCarousel from "embla-carousel-react";

import { useGetUsersQuery } from "../../../redux/backendApi";
import { AuthorCard, SkeletonAuthorCard } from "../../../components";

import s from "./listAuthorsSlider.module.scss";

export const ListAuthorsSlider = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  const request = "?_sort_createdAt&_order=DESC&_limit=10&_page=1";

  const { data, isError } = useGetUsersQuery(request);
  const authors = data?.data;

  const isReady = authors && authors.length;

  return (
    <div className={s.root} ref={emblaRef}>
      <div className={s.slider}>
        {!isReady
          ? [...Array(4)].map((_, i) => (
              <div key={i} className={s.slide}>
                <SkeletonAuthorCard key={i} />
              </div>
            ))
          : authors.map((obj) => (
              <div key={obj.id} className={s.slide}>
                <AuthorCard author={obj} />
              </div>
            ))}
      </div>
    </div>
  );
};
