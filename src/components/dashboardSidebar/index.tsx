"use client";

import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useImmer } from "use-immer";

import { capitalize } from "../../utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./dashboardSidebar.module.scss";
import Chevron from "../../../public/img/default/chevron.svg";

interface NestedObject {
  [key: string]: NestedObject | string[];
}

const linkNames: NestedObject = {
  edit: {
    "about-us": ["section 1", "section 2"],
    home: ["section 3", "section 4", "section 5", "section 8"],
    rest: ["category", "contact us", "footer", "privacy policy"],
  },
  change: ["brands", "posts", "queries", "testimonials"],
  view: ["messages", "users"],
};

export const DashboardSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useImmer([false, false]);

  const currentSegment = useSelectedLayoutSegment();
  console.log(currentSegment);

  const getLinkElements = (segment1: string, segment2?: string) => {
    let linkArray = linkNames[segment1];
    let linkPiece = segment1;

    if (segment2) {
      linkArray = (linkArray as NestedObject)[segment2];

      if (segment2 !== "rest") {
        linkPiece += "/" + segment2;
      }
    }

    return (linkArray as string[]).map((name, i) => (
      <Link key={i} href={`/dashboard/${linkPiece}/${name.replace(" ", "-")}`} className={s.link}>
        {capitalize(name)}
      </Link>
    ));
  };

  const onDropdownClick = (e: React.MouseEvent<HTMLButtonElement>, idx: number) => {
    const button = e.currentTarget;
    const list = button.nextElementSibling as HTMLUListElement;
    if (!list) return;

    if (list.hasAttribute("style")) {
      list.removeAttribute("style");

      setIsOpen((o) => {
        o[idx] = false;
        return o;
      });

      return;
    }

    const listSH = list.scrollHeight;
    list.style.height = listSH + "px";

    setIsOpen((o) => {
      o[idx] = true;
      return o;
    });
  };

  return (
    <nav className={s.root}>
      <section className={s.section}>
        <h2 className={`${s.title} ${cs.title}`}>
          <Link href="" className={s.titleLink}>
            Edit
          </Link>
        </h2>

        <div className={s.dropdown}>
          <button
            onClick={(e) => onDropdownClick(e, 0)}
            className={`${s.btn} ${isOpen[0] ? s.btnActive : ""}`}
            aria-expanded={false}
            aria-controls="edit-about-us">
            About us
            <Chevron aria-hidden="true" />
          </button>

          <ul className={s.list} id="edit-about-us">
            {getLinkElements("edit", "about-us")}
          </ul>
        </div>

        <div className={s.dropdown}>
          <button
            onClick={(e) => onDropdownClick(e, 1)}
            className={`${s.btn} ${isOpen[1] ? s.btnActive : ""}`}
            aria-expanded={false}
            aria-controls="edit-home">
            Home
            <Chevron aria-hidden="true" />
          </button>

          <ul className={s.list} id="edit-home">
            {getLinkElements("edit", "home")}
          </ul>
        </div>

        {getLinkElements("edit", "rest")}
      </section>

      <section className={s.section}>
        <h2 className={`${s.title} ${cs.title}`}>
          <Link href="" className={s.titleLink}>
            Change
          </Link>
        </h2>

        {getLinkElements("change")}
      </section>

      <section className={s.section}>
        <h2 className={`${s.title} ${cs.title}`}>
          <Link href="" className={s.titleLink}>
            View
          </Link>
        </h2>

        {getLinkElements("view")}
      </section>
    </nav>
  );
};
