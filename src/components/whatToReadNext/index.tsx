"use client";

import React from "react";
import { useParams } from "next/navigation";

import { useGetPostsQuery } from "../../redux/backendApi";
import { setToast } from "../../redux/toastSlice/slice";
import { useAppDispatch } from "../../redux/store";

import { WhatToReadNextSlider } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./whatToReadNext.module.scss";

export const WhatToReadNext: React.FC = () => {
  const dispatch = useAppDispatch();
  const { category, id } = useParams();

  const request = `?category=${category}&id_ne=${id}&_order=DESC&_sort=createdAt`;

  const { data, isError, isLoading, isFetching, endpointName, originalArgs } =
    useGetPostsQuery(request);
  const nextPosts = data?.data;

  const isFailed = isError || (!nextPosts?.length && !isLoading && !isFetching);

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
      <h2 className={cs.srOnly}>List of related posts.</h2>

      <div className={`${s.container} ${cs.container}`}>
        <p className={`${s.title} ${cs.title}`}>What to read next</p>

        <WhatToReadNextSlider nextPosts={nextPosts} />
      </div>
    </section>
  );
};
