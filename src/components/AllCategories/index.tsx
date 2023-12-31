import React from "react";

import { Categories } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./allCategories.module.scss";

export const AllCategories: React.FC = () => {
  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <h2 className={`${s.title} ${cs.title}`}>All Categories</h2>
        <Categories />
      </div>
    </section>
  );
};
