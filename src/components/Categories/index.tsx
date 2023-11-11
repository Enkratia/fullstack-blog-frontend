import React from "react";
import Link from "next/link";

import s from "./Categories.module.scss";

import Business from "../../../public/img/business.svg";
import Startup from "../../../public/img/startup.svg";
import Economy from "../../../public/img/economy.svg";
import Technology from "../../../public/img/technology.svg";

const categories = [
  {
    icon: <Business aria-hidden="true" />,
    title: "Business",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor.",
  },
  {
    icon: <Startup aria-hidden="true" />,
    title: "Startup",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor.",
  },
  {
    icon: <Economy aria-hidden="true" />,
    title: "Economy",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor.",
  },
  {
    icon: <Technology aria-hidden="true" />,
    title: "Technology",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor.",
  },
];

export const Categories: React.FC = () => {
  return (
    <ul className={s.root}>
      {categories.map((obj, i) => (
        <li key={i} className={s.category}>
          <Link href="">
            {obj.icon}
            <h3 className={s.title}>{obj.title}</h3>
            <p className={s.descr}>{obj.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
