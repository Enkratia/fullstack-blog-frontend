import React from "react";

import s from "./notFoundCategory.module.scss";
import cs from "../../../scss/helpers.module.scss";
import Sorry from "../../../../public/img/default/sorry.svg";

type NotFoundCategoryProps = {
  resetFilters: () => void;
};

export const NotFoundCategory: React.FC<NotFoundCategoryProps> = ({ resetFilters }) => {
  return (
    <div className={s.root}>
      <Sorry />
      <h2 className={`${s.title} ${cs.sectionTitle}`}>
        Sorry, there are currently no posts matching your request.
      </h2>
      <span className={s.subtitle}>
        try softening your search terms or search in a different category
      </span>
      <button onClick={resetFilters} className={cs.btn}>
        Reset filters
      </button>
    </div>
  );
};
