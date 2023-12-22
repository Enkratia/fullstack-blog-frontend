"use client";

import React from "react";
import { useGetPostsQuery } from "../../redux/backendApi";

import cs from "../../scss/helpers.module.scss";
import s from "./myPosts.module.scss";
import { useSession } from "next-auth/react";

export const MyPosts: React.FC = () => {
  const { data: session } = useSession();

  const request = `?user.id=${session?.user.id}`;
  const { data: posts, isError } = useGetPostsQuery(request);

  return (
    <div className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>My posts</h2>

      <ul className={s.list}>
        <li className={s.item}></li>
      </ul>
    </div>
  );
};
