import Link from "next/link";
import React from "react";

import { ListAuthorsSlider } from "./ListAuthorsSlider";

import s from "./ListAuthors.module.scss";
import cs from "../../scss/helpers.module.scss";

export const ListAuthors: React.FC = () => {
  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <h2 className={`${s.title} ${cs.title}`}>List of Authors</h2>

        <ListAuthorsSlider />
      </div>
    </section>
  );
};
