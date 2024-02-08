"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { capitalize } from "../../../utils/customFunctions";

// import cs from "../../../scss/helpers.module.scss";
import s from "./dashboardBreadcrumbs.module.scss";

export const DashboardBreadcrumbs: React.FC = () => {
  const pathname = usePathname();

  // TEMP
  let title = "title";
  let isTitle = false;

  // **
  const breadcrumbsPaths = pathname.split("/").filter((crumb) => crumb !== "");

  const getLink = (idx: number) => {
    let link = "";

    for (let i = 0; i <= idx; i++) {
      link += "/" + breadcrumbsPaths[i];
    }

    return link;
  };

  const getTitle = () => {
    return title ? capitalize(title) : <div>skeleton</div>;
  };

  const breadcrumbsElements = breadcrumbsPaths.map((crumb, i) => (
    <li key={i} className={s.item}>
      {i === breadcrumbsPaths.length - 1 ? (
        isTitle ? (
          getTitle()
        ) : (
          capitalize(crumb).replace("-", " ")
        )
      ) : (
        <Link href={getLink(i)} className={s.link}>
          {capitalize(crumb).replace("-", " ")}
        </Link>
      )}
    </li>
  ));

  return (
    <div className={s.root}>
      <ul className={s.list}>{breadcrumbsElements}</ul>
    </div>
  );
};
