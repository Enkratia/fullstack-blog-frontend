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
  {
    segment: "my-posts",
    title: "My posts",
  },
];

export const AccountSidebarLayer: React.FC = () => {
  const segment = useSelectedLayoutSegment();

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
          <Link className={s.link} href="/">
            Exit
          </Link>
        </li>
      </ul>
    </aside>
  );
};
