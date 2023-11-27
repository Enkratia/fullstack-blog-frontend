import React from "react";
import Link from "next/link";

import { fetchCategoryHeaderQuery } from "@/fetchApi/fetchApi";

import s from "./Categories.module.scss";

import Business from "../../../public/img/business.svg";
import Startup from "../../../public/img/startup.svg";
import Economy from "../../../public/img/economy.svg";
import Technology from "../../../public/img/technology.svg";

// const data: CategoryDescription[] = [
//   {
//     description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor.",
//   },
//   {
//     description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor.",
//   },
//   {
//     description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor.",
//   },
//   {
//     description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor.",
//   },
// ];

const categoryIcons = [
  {
    title: "Business",
    icon: <Business aria-hidden="true" />,
  },
  {
    title: "Startup",
    icon: <Startup aria-hidden="true" />,
  },
  {
    title: "Economy",
    icon: <Economy aria-hidden="true" />,
  },
  {
    title: "Technology",
    icon: <Technology aria-hidden="true" />,
  },
];

export const Categories: React.FC = async () => {
  const { data, isError } = await fetchCategoryHeaderQuery();

  return (
    <ul className={s.root}>
      {data.map((obj, i) => (
        <li key={i} className={s.category}>
          <Link href="">
            {categoryIcons[i].icon}
            <h3 className={s.title}>{categoryIcons[i].title}</h3>
            <p className={s.descr}>{obj.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
