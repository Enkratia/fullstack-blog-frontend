"use client";

import React from "react";

import useEmblaCarousel from "embla-carousel-react";

import { useGetUsersQuery } from "../../../redux/backendApi";
import { useAppDispatch } from "../../../redux/store";
import { setToast } from "../../../redux/toastSlice/slice";

import { AuthorCard, SkeletonAuthorCard } from "../../../components";

import s from "./listAuthorsSlider.module.scss";

export const ListAuthorsSlider = () => {
  const dispatch = useAppDispatch();
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  const request = "?_sort_createdAt&_order=DESC&_limit=10&_page=1";

  const { data, isError, isLoading, isFetching, requestId, originalArgs } =
    useGetUsersQuery(request);
  const authors = data?.data;

  const isReady = !!authors?.length;
  const isFailed = isError || (!authors?.length && !isLoading && !isFetching);

  React.useEffect(() => {
    if (isFailed) {
      console.log(requestId);

      dispatch(
        setToast({
          type: "warning",
          args: originalArgs ?? "",
          text: "Failed to load some data.111",
        }),
      );
    }
  }, [isFailed]);

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
