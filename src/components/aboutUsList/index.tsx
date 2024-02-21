"use client";

import React from "react";

import { useGetUsersQuery } from "../../redux/backendApi";
import { useAppDispatch } from "../../redux/store";
import { setToast } from "../../redux/toastSlice/slice";

import { AuthorCard, Navigation, SkeletonAuthorCard } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./aboutUsList.module.scss";

export const AboutUsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const limit = 8;
  const [page, setPage] = React.useState(1);

  const request = `?_page=${page}&_limit=${limit}&_sort=createdAt&_order=DESC`;
  const { data, isError, isLoading, isFetching, originalArgs, endpointName } =
    useGetUsersQuery(request);
  const authorsList = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  // **
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

  // **
  const isReady = !!authorsList && !!authorsList.length;
  const isFailed = isError || (!authorsList?.length && !isLoading && !isFetching);

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
      <div className={`${s.container} ${cs.container}`}>
        <h2 className={`${s.title} ${cs.title}`}>List of Authors</h2>

        <ul className={s.list}>
          {!isReady
            ? [...Array(4)].map((_, i) => (
                <li key={i} className={s.item}>
                  <SkeletonAuthorCard />
                </li>
              ))
            : authorsList.map((obj) => (
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
