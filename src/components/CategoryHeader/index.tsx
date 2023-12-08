"use client";

import React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

import { capitalize } from "../../utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./categoryHeader.module.scss";

const categories = ["startup", "business", "economy", "technology"];

type ParamsType = {
  category: string;
};

const data: CategoryHeaderType = {
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
};

export const CategoryHeader: React.FC = () => {
  const params: ParamsType = useParams();
  const category = params.category;

  if (!categories.includes(category)) {
    notFound();
  }

  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <p className={s.title}>{capitalize(category)}</p>
        <p className={s.descr}>{data.description}</p>

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
