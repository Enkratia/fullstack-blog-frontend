import React from "react";
import Link from "next/link";

import s from "./notFoundOops.module.scss";
import cs from "../../../../scss/helpers.module.scss";
import Wrong from "../../../../../public/img/default/wrong.svg";
// import NoData from "../../../../public/img/default/no-data.svg";

export const NotFoundOops: React.FC = () => {
  return (
    <div className={s.root}>
      <Wrong />
      <h2 className={`${s.title} ${cs.sectionTitle}`}>Oops!.. something went wrong</h2>
      <span className={s.subtitle}>Sorry, the page is temporarily not unavailable</span>
      <Link href="/" className={`${cs.btn} ${cs.btnMid} ${cs.btnOutline}`}>
        Home page
      </Link>
    </div>
  );
};
