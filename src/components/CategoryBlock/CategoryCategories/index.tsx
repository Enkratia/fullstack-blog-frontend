import React from "react";
import Link from "next/link";

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
    title: "Startup",
  },
  {
    icon: <Business aria-hidden="true" />,
    title: "Business",
  },
  {
    icon: <Economy aria-hidden="true" />,
    title: "Economy",
  },
  {
    icon: <Technology aria-hidden="true" />,
    title: "Technology",
  },
];

export const CategoryCategories: React.FC = () => {
  return (
    <div className={s.root}>
      <h3 className={`${s.title} ${cs.title}`}>Categories</h3>

      <ul className={s.list}>
        {categories.map((category, i) => (
          <li key={i} className={s.item}>
            <Link href="" className={s.link}>
              {category.icon}
              <span className={s.category}>{capitalize(category.title)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
