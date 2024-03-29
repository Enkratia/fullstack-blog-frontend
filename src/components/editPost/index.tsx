"use client";

import React from "react";
import { useParams } from "next/navigation";

import { useGetPostByIdQuery } from "../../redux/backendApi";

import { EditPostForm, NotFoundPost, SkeletonEditPostForm } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./editPostBlock.module.scss";

export const EditPostBlock: React.FC = () => {
  const id = useParams().id.toString();
  const { data, isError } = useGetPostByIdQuery(id);

  if (isError) {
    return <NotFoundPost />;
  }

  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container} ${cs.container1024}`}>
        <h2 className={`${s.title} ${cs.title}`}>Edit post</h2>

        {!data ? <SkeletonEditPostForm /> : <EditPostForm post={data} />}
      </div>
    </section>
  );
};
