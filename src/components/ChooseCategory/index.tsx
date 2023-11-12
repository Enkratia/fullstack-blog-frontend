import React from "react";

import { Categories } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./ChooseCategory.module.scss";

export const ChooseCategory: React.FC = () => {
  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <h2 className={`${s.title} ${cs.title}`}>Choose A Category</h2>
        <Categories />
      </div>
    </section>
  );
};
