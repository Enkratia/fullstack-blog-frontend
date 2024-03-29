"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useImmer } from "use-immer";

import { capitalize } from "../../../utils/customFunctions";

import cs from "../../../scss/helpers.module.scss";
import s from "./dashboardNav.module.scss";
import Chevron from "../../../../public/img/default/chevron.svg";
import Close from "../../../../public/img/close.svg";

interface NestedObject {
  [key: string]: NestedObject | string[];
}

const linkNames: NestedObject = {
  edit: {
    "about-us": ["section 1", "section 2", "section 3"],
    home: ["section 3", "section 4", "section 5", "section 8", "section 9"],
    rest: ["category", "contact us", "footer", "privacy policy"],
  },
  change: ["brands", "posts", "queries", "testimonials"],
  view: ["messages", "users"],
};

type DashboardNavProps = {
  onModalCloseClick?: () => void;
};

export const DashboardNav: React.FC<DashboardNavProps> = ({ onModalCloseClick }) => {
  const linkPrevRef = React.useRef<HTMLAnchorElement | null>();
  const linkPrevDropdownRef = React.useRef<HTMLAnchorElement | null>();

  const isMount = React.useRef(true);
  const navRef = React.useRef<HTMLElement>(null);

  const [isOpen, setIsOpen] = useImmer([false, false]);

  const pathname = usePathname();

  // снять класс с неактивной ссылки | добавить активной
  React.useEffect(() => {
    if (pathname === "/dashboard") {
      navRef.current?.querySelector("[data-link-active]")?.removeAttribute("data-link-active");
      return;
    }

    // **
    const links = navRef.current?.querySelectorAll("a") || [];

    const linksMatched = [...links].filter((link) => {
      const href = link.getAttribute("href");

      if (href && pathname.startsWith(href)) {
        return link;
      }
    });

    const linkMostMatched = linksMatched.slice().sort((a, b) => {
      const hrefPrev = a.getAttribute("href");
      const hrefNext = b.getAttribute("href");

      const matchesPrev = hrefPrev?.match(/\//g)?.length || 0;
      const mathesNext = hrefNext?.match(/\//g)?.length || 0;

      return matchesPrev > mathesNext ? -1 : 1;
    })[0];

    // **
    const linkPrev = navRef.current?.querySelector("[data-link-active]") as HTMLAnchorElement;
    linkPrev?.removeAttribute("data-link-active");

    linkMostMatched?.setAttribute("data-link-active", "");

    linkPrevRef.current = linkMostMatched;
  }, [pathname]);

  // открыть dropdown при клике | закрыть, если прошлой активной ссылкой был этот dropdown (по клику только)
  React.useEffect(() => {
    const dropdown = linkPrevRef.current?.closest("[data-dropdown-idx]");
    if (!dropdown) return;

    const dropdownBtn = dropdown.firstElementChild as HTMLAnchorElement;
    if (!dropdownBtn) return;

    const dropdownIdx = dropdown.getAttribute("data-dropdown-idx");

    if (dropdownIdx) {
      onDropdownClick(dropdownBtn, +dropdownIdx);
    }
  }, [pathname]);

  // **
  const onDropdownClick = (btn: HTMLAnchorElement, idx: number, isRealClick?: boolean) => {
    const list = btn.nextElementSibling as HTMLUListElement;
    if (!list) return;

    // **
    if (isRealClick) {
      linkPrevDropdownRef.current = btn;
    }

    const isThisDropdownBtnLastActive = linkPrevDropdownRef.current === linkPrevRef.current;

    // **
    if (list.hasAttribute("style") && isRealClick && isThisDropdownBtnLastActive) {
      list.removeAttribute("style");

      setIsOpen((o) => {
        if (o[idx] === false) return o;

        o[idx] = false;
        return o;
      });

      return;
    }

    const listSH = list.scrollHeight;
    list.style.height = listSH + "px";

    setIsOpen((o) => {
      if (o[idx] === true) return o;

      o[idx] = true;
      return o;
    });
  };

  const onCloseClick = () => {
    onModalCloseClick && onModalCloseClick();
  };

  // **
  const getLinkElements = (segment1: string, segment2?: string, isList?: boolean) => {
    let linkArray = linkNames[segment1];
    let linkPiece = segment1;

    if (segment2) {
      linkArray = (linkArray as NestedObject)[segment2];

      if (segment2 !== "rest") {
        linkPiece += "/" + segment2;
      }
    }

    return (linkArray as string[]).map((name, i) =>
      isList ? (
        <li key={i} className={s.item}>
          <Link href={`/dashboard/${linkPiece}/${name.replace(" ", "-")}`} className={s.link}>
            {capitalize(name)}
          </Link>

          <span className={s.itemMark} aria-hidden="true"></span>
        </li>
      ) : (
        <Link key={i} href={`/dashboard/${linkPiece}/${name.replace(" ", "-")}`} className={s.link}>
          {capitalize(name)}
        </Link>
      ),
    );
  };

  return (
    <div className={s.navWrapper}>
      <div className={s.head}>
        <p className={`${s.headTitle} ${cs.title}`}>Dashboard Menu</p>

        <button onClick={onCloseClick} className={s.headClose} aria-label="Close the menu.">
          <Close aria-hidden="true" />
        </button>
      </div>

      <div>
        <nav className={s.nav} ref={navRef}>
          <section className={s.section}>
            <h2 className={`${s.title} ${cs.title}`}>
              <Link href="/dashboard/edit" className={s.titleLink}>
                Edit
              </Link>
            </h2>

            <div className={s.dropdown} data-dropdown-idx={0}>
              <Link
                href="/dashboard/edit/about-us"
                onClick={(e) => onDropdownClick(e.currentTarget, 0, true)}
                className={`${s.btn} ${isOpen[0] ? s.btnActive : ""}`}
                aria-expanded={false}
                aria-controls="edit-about-us">
                About us
                <Chevron aria-hidden="true" />
              </Link>

              <ul className={s.list} id="edit-about-us">
                {getLinkElements("edit", "about-us", true)}
              </ul>
            </div>

            <div className={s.dropdown} data-dropdown-idx={1}>
              <Link
                href="/dashboard/edit/home"
                onClick={(e) => onDropdownClick(e.currentTarget, 1, true)}
                className={`${s.btn} ${isOpen[1] ? s.btnActive : ""}`}
                aria-expanded={false}
                aria-controls="edit-home">
                Home
                <Chevron aria-hidden="true" />
              </Link>

              <ul className={s.list} id="edit-home">
                {getLinkElements("edit", "home", true)}
              </ul>
            </div>

            {getLinkElements("edit", "rest")}
          </section>

          <section className={s.section}>
            <h2 className={`${s.title} ${cs.title}`}>
              <Link href="/dashboard/change" className={s.titleLink}>
                Change
              </Link>
            </h2>

            {getLinkElements("change")}
          </section>

          <section className={s.section}>
            <h2 className={`${s.title} ${cs.title}`}>
              <Link href="/dashboard/view" className={s.titleLink}>
                View
              </Link>
            </h2>

            {getLinkElements("view")}
          </section>
        </nav>
      </div>
    </div>
  );
};
