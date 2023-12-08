"use client";

import Link from "next/link";

import { useMediaQuery } from "../../../utils/customHooks";
import { SignBtn } from "../../../components";

import cs from "../../../scss/helpers.module.scss";
import s from "./nav.module.scss";
import CloseSvg from "../../../../public/img/close.svg";

const basicLinks = [
  {
    linkUrl: "/",
    linkName: "Home",
  },
  {
    linkUrl: "/blog",
    linkName: "Blog",
  },
  {
    linkUrl: "/about-us",
    linkName: "About Us",
  },
  {
    linkUrl: "/contact-us",
    linkName: "Contact Us",
  },
];

type NavProps = {
  onModalCloseClick?: () => void;
};

export const Nav: React.FC<NavProps> = ({ onModalCloseClick }) => {
  const { isMQ896 } = useMediaQuery();

  const onCloseClick = () => {
    if (isMQ896 || !onModalCloseClick) return;
    onModalCloseClick();
  };

  return (
    <div className={s.rootWrapper}>
      <div className={s.head}>
        <p className={`${s.title} ${cs.title}`}>Menu</p>

        <button onClick={onCloseClick} className={s.close} aria-label="Close this menu.">
          <CloseSvg aria-hidden="true" />
        </button>
      </div>

      <nav className={s.root}>
        {basicLinks.map((link, i) => (
          <Link onClick={onCloseClick} key={i} href={link.linkUrl} className={s.link}>
            {link.linkName}
          </Link>
        ))}

        <SignBtn onCloseClick={onCloseClick} className={s.link} />
      </nav>
    </div>
  );
};
