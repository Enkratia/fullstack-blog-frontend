"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import cs from "../../../scss/helpers.module.scss";
import s from "./accountSidebarLayer.module.scss";

const rawLinks = [
  {
    segment: "/account/profile",
    title: "Profile",
  },
  {
    segment: "/account/add-post",
    title: "Add post",
  },
  {
    segment: "/account/my-posts",
    title: "My posts",
  },
  {
    segment: "/dashboard",
    title: "Dashboard",
  },
];

export const AccountSidebarLayer: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

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

    await signOut({
      redirect: false,
    });

    window.location.reload();
  };

  const onMenuBtnClick = () => {
    setIsActive((b) => !b);
  };

  // **
  const isAdmin = session?.user?.isAdmin;
  const links = isAdmin ? rawLinks : rawLinks.slice(0, rawLinks.length - 1);

  return (
    <aside className={s.root}>
      <div className={`${s.wrapper} ${isActive ? s.wrapperActive : ""}`}>
        <p className={`${s.title} ${cs.title}`}>Account</p>

        <div className={s.accountMenuBtnWrapper}>
          <button onClick={onMenuBtnClick} className={`${s.accountMenuBtn} ${cs.btn}`}>
            Account Menu
          </button>
        </div>

        <ul className={`${s.list} ${isActive ? s.listActive : ""}`} ref={ulRef}>
          {links.map((link, i) => (
            <li key={i} className={`${s.item} ${link.segment === pathname ? s.itemActive : ""}`}>
              <Link className={s.link} href={link.segment}>
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
      </div>
    </aside>
  );
};
