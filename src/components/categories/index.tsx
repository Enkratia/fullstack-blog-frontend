import React, { Suspense } from "react";
import Link from "next/link";

import { fetchCategoryDescriptionQuery } from "../../fetchApi/fetchApi";

import { SkeletonCategories, ToastComponent } from "../../components";
import { capitalize } from "../../utils/customFunctions";

import s from "./categories.module.scss";
import Business from "../../../public/img/business.svg";
import Startup from "../../../public/img/startup.svg";
import Economy from "../../../public/img/economy.svg";
import Technology from "../../../public/img/technology.svg";

const icons = [
  {
    title: "business",
    icon: <Business aria-hidden="true" />,
  },
  {
    title: "startup",
    icon: <Startup aria-hidden="true" />,
  },
  {
    title: "economy",
    icon: <Economy aria-hidden="true" />,
  },
  {
    title: "technology",
    icon: <Technology aria-hidden="true" />,
  },
];

const CategoriesSuspense: React.FC = async () => {
  const { data, args } = await fetchCategoryDescriptionQuery();

  if (!data) {
    return (
      <>
        <SkeletonCategories />
        <ToastComponent type="warning" args={args} text="Failed to load some data." />
      </>
    );
  }

  return (
    <ul className={s.root}>
      {icons.map(({ title, icon }, i) => (
        <li key={i} className={s.category}>
          <Link href={`/blog/${title}`}>
            {icon}
            <h3 className={s.title}>{capitalize(title)}</h3>
            <p className={s.descr}>{data[title as CategoryNames[number]]}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

// **
export const Categories: React.FC = async () => {
  return (
    <Suspense fallback={<SkeletonCategories />}>
      <CategoriesSuspense />
    </Suspense>
  );
};
