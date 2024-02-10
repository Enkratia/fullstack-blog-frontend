import React from "react";
import Link from "next/link";

import { capitalize } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "../editSection.module.scss";
import Arrow from "../../../../public/img/default/arrow.svg";

const pageNames = ["about us", "home", "category", "contact us", "footer", "privacy policy"];

export const EditBlock: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Edit</h2>

      <ul className={s.grid}>
        {pageNames.map((pageName, i) => (
          <li key={i} className={s.gridItem}>
            <h3 className={s.gridTitle}>{capitalize(pageName)}</h3>

            <p className={s.descr}>{`Edit the content of the '${pageName}' page`}</p>

            <Link
              href={`/dashboard/edit/${pageName.replace(" ", "-")}`}
              className={`${s.gridBtn} ${cs.btn}`}>
              Edit
              <Arrow aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
