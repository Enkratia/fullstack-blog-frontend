import React from "react";
import Link from "next/link";

import s from "./notFoundData.module.scss";
import cs from "../../../../scss/helpers.module.scss";
import NoData from "../../../../../public/img/default/no-data.svg";

export const NotFoundData: React.FC = () => {
  return (
    <div className={s.root}>
      <NoData />
      <h2 className={`${s.title} ${cs.title}`}>No Data Found</h2>
    </div>
  );
};
