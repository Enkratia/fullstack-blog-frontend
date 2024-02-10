import React from "react";
import Link from "next/link";

import { DashboardBlockStats } from "../../../components";

import { capitalize } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "../editSection.module.scss";
import Arrow from "../../../../public/img/default/arrow.svg";

const pageNames = ["edit", "change", "view"];

export const DashboardBlock: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Dashboard</h2>

      <DashboardBlockStats />

      <ul className={s.grid}>
        {pageNames.map((pageName, i) => (
          <li key={i} className={s.gridItem}>
            <h3 className={s.gridTitle}>{capitalize(pageName)}</h3>

            <p className={s.descr}>{`${capitalize(pageName)} ${
              i === pageNames.length - 1 ? "data" : "the content of the pages"
            }`}</p>

            <Link href={`/dashboard/${pageName}`} className={`${s.gridBtn} ${cs.btn}`}>
              {capitalize(pageName)}
              <Arrow aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
