"use client";

import qs from "qs";

import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useGetPostsQuery } from "../../redux/backendApi";

import { Article, Navigation, SkeletonArticle } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./authorPosts.module.scss";

export const AuthorPosts: React.FC = () => {
  const limit = 2;

  const isRouter = React.useRef(false);
  const [isNavigate, setIsNavigate] = React.useState<boolean | {}>(false);
  const router = useRouter();
  const searchParams = useSearchParams().toString();
  const { id } = useParams();

  const getUrlSearch = () => {
    const urlSearch = qs.parse(searchParams, { arrayLimit: 1000 });
    const urlPage = Number(urlSearch._page || "1");

    return { urlPage };
  };
  const { urlPage } = getUrlSearch();

  const [page, setPage] = React.useState(urlPage);

  const request = `?_page=${page}&_limit=${limit}&user.id=${id}&_sort=createdAt&_order=DESC`;
  const requestlocal = `?_page=${page}&_limit=${limit}&_sort=createdAt&_order=DESC`;

  const { data, isError, isLoading, refetch } = useGetPostsQuery(request);
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
      router.push(requestlocal, { scroll: false });
      isRouter.current = true;
    }
  }, [isNavigate]);

  if (isError) {
    console.warn("Failed to load author`s posts");
  }

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
      <div className={`${s.container} ${cs.container} ${cs.container1024}`}>
        <h2 className={s.title}>My Posts</h2>

        {posts?.length === 0 ? (
          <p>No posts.</p>
        ) : (
          <ul className={s.list}>
            {!posts
              ? [...Array(2)].map((_, i) => (
                  <li key={i} className={s.item}>
                    <SkeletonArticle isArticlePage={true} />
                  </li>
                ))
              : posts.map((post) => (
                  <li key={post.id} className={s.item}>
                    <Article obj={post} isArticlePage={true} refetch={refetchPostsAfterDelete} />
                  </li>
                ))}
          </ul>
        )}

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
