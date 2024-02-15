"use client";

import React from "react";
import { useParams } from "next/navigation";

import { useGetPostsQuery } from "../../redux/backendApi";

import { WhatToReadNextSlider } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./whatToReadNext.module.scss";

export const WhatToReadNext: React.FC = () => {
  const { category, id } = useParams();

  const request = `?category=${category}&id_ne=${id}&_order=DESC&_sort=createdAt`;

  const { data, isError } = useGetPostsQuery(request);
  const nextPosts = data?.data;

  if (!nextPosts || nextPosts.length === 0) {
    return;
  }

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
