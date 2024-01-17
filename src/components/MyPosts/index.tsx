"use client";

import qs from "qs";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { useGetPostsQuery } from "../../redux/backendApi";

import { Article, Pagination } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./myPosts.module.scss";

const limit = 3;

export const MyPosts: React.FC = () => {
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

  const { data, isError } = useGetPostsQuery(request, { skip: session?.user?.id === undefined });
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
      router.push(requestLocal, { scroll: false });
      isRouter.current = true;
    }
  }, [isNavigate]);

  // **
  const onPageChange = ({ selected }: Record<string, number>) => {
    setPage(selected + 1);
    setIsNavigate({});
  };

  if (!posts) {
    return;
  }

  return (
    <div className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>My posts</h2>

      <ul className={s.list}>
        {posts.map((obj) => (
          <li key={obj.id} className={s.item}>
            <Article obj={obj} />
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  );
};
