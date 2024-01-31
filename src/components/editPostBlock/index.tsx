import React from "react";

import { AddPostBlock } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./editPostBlock.module.scss";

export const EditPostBlock: React.FC = () => {
  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container} ${cs.container1024}`}>
        <AddPostBlock />
      </div>
    </section>
  );
};
