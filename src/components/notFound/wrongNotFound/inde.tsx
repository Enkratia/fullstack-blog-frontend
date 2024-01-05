import React from "react";
import Link from "next/link";

import s from "./wrongNotFound.module.scss";
import cs from "../../../scss/helpers.module.scss";
import Wrong from "../../../../public/img/default/wrong.svg";

export const SmthWrong: React.FC = () => {
  return (
    <div className={s.root}>
      <Wrong />
      <h2 className={`${s.title} ${cs.sectionTitle}`}>Oops!</h2>
      <span className={s.subtitle}>something went worng</span>
      <Link href="/" className={`${cs.btn} ${cs.btnMid} ${cs.btnOutline}`}>
        Home page
      </Link>
    </div>
  );
};
