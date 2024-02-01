import React from "react";
import Link from "next/link";

import s from "./postNotFound.module.scss";
import cs from "../../../scss/helpers.module.scss";
import Sorry from "../../../../public/img/default/sorry.svg";

export const PostNotFound: React.FC = () => {
  return (
    <div className={s.root}>
      <Sorry />
      <h2 className={`${s.title} ${cs.sectionTitle}`}>
        Sorry, there is currently no post matching your request.
      </h2>
      <span className={s.subtitle}>try search another one or come back a little later</span>
      <Link href="/blog" className={`${cs.btn} ${cs.btnMid} ${cs.btnOutline}`}>
        Blog page
      </Link>
    </div>
  );
};
