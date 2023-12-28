"use client";

import qs from "qs";

import React from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useGetPostsQuery } from "../../redux/backendApi";

import { Article, Pagination } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./myPosts.module.scss";

const limit = 4;

export const MyPosts: React.FC = () => {
  const [isNavigate, setIsNavigate] = React.useState<boolean | {}>(false);
  const isMount = React.useRef(true);
  const searchParams = useSearchParams();

  const { data: session } = useSession();
  const router = useRouter();

  const getInitialURL = () => {
    const searchQS = qs.parse(window.location.search.substring(1));
    const initialPage = searchQS._page || "";

    return { initialPage };
  };
  const { initialPage } = getInitialURL();

  const [page, setPage] = React.useState(Number(initialPage) || 1);

  const requestObjQS = {
    _page: page,
    _limit: limit,
  };

  const requestObj = {
    "user.id": session?.user?.id,
    _page: page,
    _limit: limit,
  };

  let requestQS = `?${qs.stringify(requestObjQS, { encode: true })}`;
  let request = `?${qs.stringify(requestObj, { encode: true })}`;

  const { data, isError } = useGetPostsQuery(request, { skip: session?.user?.id === undefined });
  const posts = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  React.useEffect(() => {
    // const searchQS = qs.parse(window.location.search.substring(1));
    // const initialPage = searchQS._page || "";

    initialPage && +initialPage !== page && setPage(+initialPage);
  }, [searchParams]);

  console.log("rere");

  React.useEffect(() => {
    if (isNavigate) {
      router.push(requestQS);
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

      {totalCount && totalCount > limit && (
        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  );
};
