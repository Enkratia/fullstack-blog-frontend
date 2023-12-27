"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useGetPostsQuery } from "../../redux/backendApi";

import { Article, Pagination } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./myPosts.module.scss";

const limit = 4;

export const MyPosts: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [page, setPage] = React.useState(1);

  const request = `?user.id=${session?.user?.id}&_limit=${limit}&_page=${page}`;

  const { data, isError } = useGetPostsQuery(request, { skip: session?.user?.id === undefined });
  const posts = data?.data;
  const totalCount = data?.totalCount;

  const totalPages = Math.ceil((totalCount || 1) / limit);

  // **
  const onPageChange = ({ selected }: Record<string, number>) => {
    setPage(selected + 1);
    router.replace(request, { scroll: false });
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
