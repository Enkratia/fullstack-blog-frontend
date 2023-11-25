import React from "react";
import Link from "next/link";

import s from "./Categories.module.scss";

import Business from "../../../public/img/business.svg";
import Startup from "../../../public/img/startup.svg";
import Economy from "../../../public/img/economy.svg";
import Technology from "../../../public/img/technology.svg";

const data: CategoryDescription[] = [
  {
    title: "Business",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor.",
  },
  {
    title: "Startup",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor.",
  },
  {
    title: "Economy",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor.",
  },
  {
    title: "Technology",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor.",
  },
];

const categoryIcons = [
  {
    icon: <Business aria-hidden="true" />,
  },
  {
    icon: <Startup aria-hidden="true" />,
  },
  {
    icon: <Economy aria-hidden="true" />,
  },
  {
    icon: <Technology aria-hidden="true" />,
  },
];

export const Categories: React.FC = () => {
  return (
    <ul className={s.root}>
      {data.map((obj, i) => (
        <li key={i} className={s.category}>
          <Link href="">
            {categoryIcons[i].icon}
            <h3 className={s.title}>{obj.title}</h3>
            <p className={s.descr}>{obj.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
