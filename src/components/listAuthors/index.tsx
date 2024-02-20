import React from "react";

import { ListAuthorsSlider } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./listAuthors.module.scss";

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
