"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { capitalize } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./categoryCategories.module.scss";

import Business from "../../../../public/img/business.svg";
import Startup from "../../../../public/img/startup.svg";
import Economy from "../../../../public/img/economy.svg";
import Technology from "../../../../public/img/technology.svg";

const categories = [
  {
    icon: <Startup aria-hidden="true" />,
    title: "startup",
  },
  {
    icon: <Business aria-hidden="true" />,
    title: "business",
  },
  {
    icon: <Economy aria-hidden="true" />,
    title: "economy",
  },
  {
    icon: <Technology aria-hidden="true" />,
    title: "technology",
  },
];

type CategoryCategoriesProps = {
  onCategoryClick: (e: React.MouseEvent<HTMLAnchorElement>, ctg: string) => void;
};

export const CategoryCategories: React.FC<CategoryCategoriesProps> = ({ onCategoryClick }) => {
  const { category: categorySegment } = useParams();

  return (
    <div className={s.root}>
      <h3 className={`${s.title} ${cs.title}`}>Categories</h3>

      <ul className={s.list}>
        {categories.map((category, i) => (
          <li key={i} className={s.item}>
            <Link
              onClick={(e) => onCategoryClick(e, category.title)}
              href=""
              className={`${s.link} ${category.title === categorySegment ? s.linkActive : ""}`}>
              {category.icon}
              <span className={s.category}>{capitalize(category.title)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
