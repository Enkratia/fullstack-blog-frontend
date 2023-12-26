"use client";

import React from "react";
import { useSession } from "next-auth/react";

import { useGetPostsQuery } from "../../redux/backendApi";

import { Article } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./myPosts.module.scss";

export const MyPosts: React.FC = () => {
  const { data: session } = useSession();

  const request = `?user.id=${session?.user?.id}`;
  const { data, isError } = useGetPostsQuery(request, { skip: session?.user?.id === undefined });

  const posts = data?.data;
  const count = data?.totalCount;

  if (!posts) {
    return;
  }

  return (
    <div className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>My posts</h2>

      <ul className={s.list}>
        {posts.map((obj) => (
          <Article key={obj.id} obj={obj} />
        ))}
      </ul>
    </div>
  );
};
