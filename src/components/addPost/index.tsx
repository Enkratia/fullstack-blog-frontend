import React from "react";

import { AddPostForm } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./addPost.module.scss";

export const AddPostBlock: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Add post</h2>
      <AddPostForm />
    </section>
  );
};
