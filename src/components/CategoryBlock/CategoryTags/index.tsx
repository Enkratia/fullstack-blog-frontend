// "use client";

import React from "react";
import Link from "next/link";

// import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
// import "overlayscrollbars/overlayscrollbars.css";

import cs from "../../../scss/helpers.module.scss";
import s from "./categoryTags.module.scss";

const tags: CategoryTags = [
  "Business",
  "Experience",
  "Screen",
  "Technology",
  "Marketing",
  "Life",
  "Technology",
  "Marketing",
  "Life",
];

export const CategoryTags: React.FC = () => {
  return (
    <div className={s.root}>
      <h3 className={`${s.title} ${cs.title}`}>All Tags</h3>

      {/* <OverlayScrollbarsComponent element="aside" defer className={s.sidebar}> */}
      <ul className={s.list}>
        {tags.map((tag, i) => (
          <li key={i} className={s.item}>
            <Link href="#" className={s.tag}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
      {/* </OverlayScrollbarsComponent> */}
    </div>
  );
};
