import React from "react";
import Link from "next/link";

import { capitalize } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "../editSection.module.scss";
import Arrow from "../../../../public/img/default/arrow.svg";

const pageNames = ["messages", "users"];

export const ViewBlock: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>View</h2>

      <ul className={s.grid}>
        {pageNames.map((pageName, i) => (
          <li key={i} className={s.gridItem}>
            <h3 className={s.gridTitle}>{capitalize(pageName)}</h3>

            <p className={s.descr}>{`View '${pageName}'`}</p>

            <Link
              href={`/dashboard/view/${pageName.replace(" ", "-")}`}
              className={`${s.gridBtn} ${cs.btn}`}>
              View
              <Arrow aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
