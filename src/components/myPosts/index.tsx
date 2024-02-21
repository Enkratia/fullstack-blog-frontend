"use client";

import qs from "qs";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { useGetPostsQuery } from "../../redux/backendApi";
import { useAppDispatch } from "../../redux/store";
import { setToast } from "../../redux/toastSlice/slice";

import { Article, Pagination, SkeletonArticle } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./myPosts.module.scss";

const limit = 3;

export const MyPosts: React.FC = () => {
  const dispatch = useAppDispatch();
  const isRouter = React.useRef(true);
  const [isNavigate, setIsNavigate] = React.useState<boolean | {}>(false);

  const { data: session } = useSession();
  const searchParams = useSearchParams().toString();
  const router = useRouter();

  const getUrlSearch = () => {
    const urlSearch = qs.parse(searchParams, { arrayLimit: 1000 });
    const urlPage = Number(urlSearch._page || "1");

    return { urlPage };
  };
  const { urlPage } = getUrlSearch();

  const [page, setPage] = React.useState(urlPage);

  class Request {
    _page = page;
    _limit = limit;

    "user.id";

    constructor(isExtend: boolean) {
      if (isExtend) {
        this["user.id"] = session?.user?.id as string;
      }
    }
  }

  let requestLocal = `?${qs.stringify(new Request(false), { encode: true })}`;
  let request = `?${qs.stringify(new Request(true), { encode: true })}`;

  const {
    data,
    isError,
    isLoading,
    isFetching,
    refetch,
    originalArgs,
    endpointName,
    isUninitialized,
  } = useGetPostsQuery(request, {
    skip: session?.user?.id === undefined,
  });
  const posts = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  const isFailed = isError || (!posts?.length && !isLoading && !isFetching && !isUninitialized);

  // **
  React.useEffect(() => {
    if (isFailed) {
      dispatch(
        setToast({
          type: "warning",
          args: endpointName + "" + originalArgs,
          text: "Failed to load posts.",
        }),
      );
    }
  }, [isFailed]);

  React.useEffect(() => {
    if (!isRouter.current) {
      urlPage !== page && setPage(urlPage);
    }

    isRouter.current = false;
  }, [searchParams]);

  React.useEffect(() => {
    if (isNavigate) {
      router.push(requestLocal, { scroll: false });
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

  const onPageChange = ({ selected }: Record<string, number>) => {
    setPage(selected + 1);
    setIsNavigate({});
  };

  return (
    <div className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>My posts</h2>

      <ul className={s.list}>
        {!posts
          ? [...Array(3)].map((_, i) => (
              <li key={i} className={s.item}>
                <SkeletonArticle key={i} />
              </li>
            ))
          : posts.map((obj) => (
              <li key={obj.id} className={s.item}>
                <Article obj={obj} refetch={refetchPostsAfterDelete} isEditable={true} />
              </li>
            ))}
      </ul>

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  );
};
