"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { signOut } from "next-auth/react";

import { useReinitApp } from "../../../utils/customHooks";
import { revaldatePathAction } from "../../../utils/actions";
import { FRONTEND_URL } from "../../../utils/constants";

import cs from "../../../scss/helpers.module.scss";
import s from "./accountSidebarLayer.module.scss";

const links = [
  {
    segment: "profile",
    title: "Profile",
  },
  {
    segment: "add-post",
    title: "Add post",
  },
  {
    segment: "my-posts",
    title: "My posts",
  },
];

export const AccountSidebarLayer: React.FC = () => {
  const reinitApp = useReinitApp();

  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  const ulRef = React.useRef<HTMLUListElement>(null);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    const ul = ulRef.current;
    if (!ul) return;

    if (isActive) {
      const listSH = ul.scrollHeight;
      ul.style.height = listSH + "px";
      return;
    }

    ul.removeAttribute("style");
  }, [isActive]);

  // **
  const onExitClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await signOut({ redirect: false });

    revaldatePathAction();
    reinitApp();
  };

  const onMenuBtnClick = () => {
    setIsActive((b) => !b);
  };

  return (
    <aside className={`${s.root} ${isActive ? s.rootActive : ""}`}>
      <p className={`${s.title} ${cs.title}`}>Account</p>

      <div className={s.accountMenuBtnWrapper}>
        <button onClick={onMenuBtnClick} className={`${s.accountMenuBtn} ${cs.btn}`}>
          Account Menu
        </button>
      </div>

      <ul className={`${s.list} ${isActive ? s.listActive : ""}`} ref={ulRef}>
        {links.map((link, i) => (
          <li key={i} className={`${s.item} ${link.segment === segment ? s.itemActive : ""}`}>
            <Link className={s.link} href={`/account/${link.segment}`}>
              {link.title}
            </Link>
          </li>
        ))}

        <li className={s.item}>
          <Link onClick={onExitClick} className={s.link} href="/">
            Exit
          </Link>
        </li>
      </ul>
    </aside>
  );
};
