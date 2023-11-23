import React from "react";
import Link from "next/link";

import cs from "../../scss/helpers.module.scss";
import s from "./CategoryHeader.module.scss";

const categories = ["startup", "business", "economy", "technology"];

export const CategoryHeader: React.FC = ({ params: { slug: string } }) => {
  console.log(slug);

  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <p className={s.title}></p>
        <p className={s.descr}></p>

        <ul className={s.breadcrumbs}>
          <li className={s.item}>
            <Link href="/blog" className={s.link}>
              Blog
            </Link>
          </li>
          <li className={`${s.item} ${s.itemMuted}`}>
            <Link href="#" className={s.link}></Link>
          </li>
        </ul>
      </div>
    </section>
  );
};
