"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useGetCategoryHeaderQuery } from "../../redux/backendApi";

import { capitalize } from "../../utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./categoryHeader.module.scss";

const categories = ["startup", "business", "economy", "technology"];

export const CategoryHeader: React.FC = () => {
  const category = useParams().category as string;

  const { data, isError } = useGetCategoryHeaderQuery();
  const header = data?.[0];

  if (!categories.includes(category)) return;

  if (!header) {
    return;
  }

  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <p className={s.title}>{capitalize(category)}</p>
        <p className={s.descr}>{header.description}</p>

        <ul className={s.breadcrumbs}>
          <li className={s.item}>
            <Link href="/blog" className={s.link}>
              Blog
            </Link>
          </li>
          <li className={s.item}>
            <Link href="#" className={s.link}>
              {category}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};
