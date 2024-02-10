import React from "react";
import Link from "next/link";

import { capitalize } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "../editSection.module.scss";
import Arrow from "../../../../public/img/default/arrow.svg";

const sectionNames = ["section 1", "section 2", "section 3"];

export const EditAboutUsBlock: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>About us</h2>

      <ul className={s.grid}>
        {sectionNames.map((sectionName, i) => (
          <li key={i} className={s.gridItem}>
            <h3 className={s.gridTitle}>{capitalize(sectionName)}</h3>

            <p className={s.descr}>{`Edit the content of home page ${sectionName}`}</p>

            <Link
              href={`/dashboard/edit/about-us/${sectionName.replace(" ", "-")}`}
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
