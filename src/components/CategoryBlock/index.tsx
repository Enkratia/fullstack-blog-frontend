import React from "react";

import s from "./categoryBlock.module.scss";
import { CategoryLayer } from "../../components";

export const CategoryBlock: React.FC = () => {
  return (
    <section className={s.root}>
      <CategoryLayer />
    </section>
  );
};
