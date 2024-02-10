"use client";

import qs from "qs";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useGetUsersQuery } from "../../../redux/backendApi";

import { AuthorCard, Pagination } from "../../../components";

import cs from "../../../scss/helpers.module.scss";
import s from "./viewUsersBlock.module.scss";

const limit = 3;

export const ViewUsersBlock: React.FC = () => {
  const isRouter = React.useRef(true);
  const [isNavigate, setIsNavigate] = React.useState<boolean | {}>(false);

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
  }

  let request = `?${qs.stringify(new Request(), { encode: true })}`;

  const { data, isError } = useGetUsersQuery(request);

  const users = data?.data;
  const totalCount = data?.totalCount;
  const totalPages = Math.ceil((totalCount || 1) / limit);

  // **
  React.useEffect(() => {
    if (!isRouter.current) {
      setPage(urlPage);
    }

    isRouter.current = false;
  }, [searchParams]);

  React.useEffect(() => {
    if (isNavigate) {
      router.push(request);
      isRouter.current = true;
    }
  }, [isNavigate]);

  if (!users) {
    return;
  }

  // **
  const onPageChange = ({ selected }: Record<string, number>) => {
    setPage(selected + 1);
    setIsNavigate({});
  };

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Users</h2>

      <ul className={s.list}>
        {users.map((user, i) => (
          <li key={i} className={s.item}>
            <AuthorCard author={user} />
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </section>
  );
};
