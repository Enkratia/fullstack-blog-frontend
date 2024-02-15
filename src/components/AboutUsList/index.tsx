"use client";

import React from "react";

import { useGetUsersQuery } from "../../redux/backendApi";

import { AuthorCard, Navigation } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./aboutUsList.module.scss";

export const AboutUsList: React.FC = () => {
  const limit = 8;
  const [page, setPage] = React.useState(1);

  const request = `?_page=${page}&_limit=${limit}&_sort=createdAt&_order=DESC`;
  const { data, isError } = useGetUsersQuery(request);
  const authorsList = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  if (!authorsList) {
    return;
  }

  const onPrevClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page === 1) return;

    setPage((n) => n - 1);
  };

  const onNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page === totalPages) return;

    setPage((n) => n + 1);
  };

  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <h2 className={`${s.title} ${cs.title}`}>List of Authors</h2>

        <ul className={s.list}>
          {authorsList.map((obj) => (
            <li key={obj.id} className={s.item}>
              <AuthorCard author={obj} />
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <Navigation
            page={page}
            totalPages={totalPages}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        )}
      </div>
    </section>
  );
};
