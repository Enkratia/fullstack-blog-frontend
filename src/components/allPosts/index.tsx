"use client";

import qs from "qs";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useGetPostsQuery } from "../../redux/backendApi";
import { Article, Navigation, SkeletonArticle } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./allPosts.module.scss";

export const AllPosts: React.FC = () => {
  const limit = 5;

  const isRouter = React.useRef(false);
  const [isNavigate, setIsNavigate] = React.useState<boolean | {}>(false);
  const router = useRouter();
  const searchParams = useSearchParams().toString();

  const getUrlSearch = () => {
    const urlSearch = qs.parse(searchParams, { arrayLimit: 1000 });
    const urlPage = Number(urlSearch._page || "1");

    return { urlPage };
  };
  const { urlPage } = getUrlSearch();

  const [page, setPage] = React.useState(urlPage);

  const request = `?_page=${page}&_limit=${limit}&_sort=createdAt&_order=DESC`;

  const { data, isError, refetch } = useGetPostsQuery(request);
  const posts = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  React.useEffect(() => {
    if (!isRouter.current) {
      urlPage !== page && setPage(urlPage);
    }

    isRouter.current = false;
  }, [searchParams]);

  React.useEffect(() => {
    if (isNavigate) {
      router.push(request, { scroll: false });
      isRouter.current = true;
    }
  }, [isNavigate]);

  // **
  const refetchPostsAfterDelete = () => {
    if (posts?.length === 1 && page > 1) {
      setPage((n) => n - 1);
      setIsNavigate({});

      return;
    }

    refetch();
  };

  const onPrevClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page === 1) return;

    setPage((n) => n - 1);
    setIsNavigate({});
  };

  const onNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page === totalPages) return;

    setPage((n) => n + 1);
    setIsNavigate({});
  };

  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <h2 className={s.title}>All posts</h2>
        <div className={s.posts}>
          {!posts
            ? [...Array(5)].map((_, i) => <SkeletonArticle key={i} />)
            : posts.map((obj) => (
                <Article key={obj.id} obj={obj} refetch={refetchPostsAfterDelete} />
              ))}
        </div>

        {totalPages > 1 && (
          <Navigation
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
            page={page}
            totalPages={totalPages}
          />
        )}
      </div>
    </section>
  );
};