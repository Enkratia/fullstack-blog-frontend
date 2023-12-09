import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

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
];

export const AccountSidebarLayer: React.FC = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <aside className={s.root}>
      <p className={`${s.title} ${cs.title}`}>Account</p>

      <ul className={s.list}>
        {links.map((link, i) => (
          <li key={i} className={`${s.item} ${link.segment === segment ? s.itemActive : ""}`}>
            <Link className={s.link} href={`/account/${link.segment}`}>
              {link.title}
            </Link>
          </li>
        ))}

        <li className={s.item}>
          <Link className={s.link} href="/">
            Exit
          </Link>
        </li>
      </ul>
    </aside>
  );
};
