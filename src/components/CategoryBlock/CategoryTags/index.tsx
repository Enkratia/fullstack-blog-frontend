"use client";

import React from "react";
import Link from "next/link";

import { useGetTagsQuery } from "../../../redux/backendApi";

import cs from "../../../scss/helpers.module.scss";
import s from "./categoryTags.module.scss";

const tags: CategoryTags = [
  "Business",
  "Experience",
  "Screen",
  "Technology",
  "Marketing",
  "Life",
  "Technology",
  "Marketing",
  "Life",
];

export const CategoryTags: React.FC = () => {
  const limit = 8;
  const [tagPage, setTagePage] = React.useState(1);

  const request = `?_page=${tagPage}&_limit=${limit}`;
  const { data, isError } = useGetTagsQuery(request);
  const tags = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  if (!tags) {
    return;
  }

  const onPrevClick = () => {
    if (tagPage === 1) return;
    setTagePage((n) => n - 1);
  };

  const onNextlick = () => {
    if (tagPage === totalPages) return;
    setTagePage((n) => n + 1);
  };

  return (
    <div className={s.root}>
      <h3 className={`${s.title} ${cs.title}`}>All Tags</h3>

      <ul className={s.list}>
        {tags.map(({ content: tag }, i) => (
          <li key={i} className={s.item}>
            <Link href="" className={s.tag}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>

      <div className={s.navigation}>
        <button
          onClick={onPrevClick}
          className={s.btn}
          disabled={tagPage === 1 ? true : false}
          aria-label={`Show previous ${limit} tags.`}></button>

        <button
          onClick={onNextlick}
          className={s.btn}
          disabled={tagPage === totalPages ? true : false}
          aria-label={`Show next ${limit} tags.`}></button>
      </div>
    </div>
  );
};
