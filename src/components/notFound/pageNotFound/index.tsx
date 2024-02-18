import React from "react";
import Link from "next/link";

import s from "./pageNotFound.module.scss";
import cs from "../../../scss/helpers.module.scss";
import Wrong from "../../../../public/img/default/wrong.svg";
// import NoData from "../../../../public/img/default/no-data.svg";

export const PageNotFound: React.FC = () => {
  return (
    <div className={s.root}>
      <Wrong />
      <h2 className={`${s.title} ${cs.sectionTitle}`}>Page not found</h2>
      <span className={s.subtitle}>
        We&apos;re sorry, the page you requested could not be found.
      </span>
      <Link href="/" className={`${cs.btn} ${cs.btnMid} ${cs.btnOutline}`}>
        Home page
      </Link>
    </div>
  );
};
