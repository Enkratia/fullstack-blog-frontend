import React from "react";
import Link from "next/link";

import s from "./notFoundPosts.module.scss";
import cs from "../../../scss/helpers.module.scss";
import Sorry from "../../../../public/img/default/sorry.svg";

export const NotFoundPosts: React.FC = () => {
  return (
    <div className={s.root}>
      <Sorry />
      <h2 className={`${s.title} ${cs.sectionTitle}`}>
        Sorry, there are currently no posts matching your request.
      </h2>
      <span className={s.subtitle}>
        try softening your search terms or search in a different category
      </span>
      {/* <Link href="/blog" className={`${cs.btn} ${cs.btnMid} ${cs.btnOutline}`}>
        Blog page
      </Link> */}
    </div>
  );
};
