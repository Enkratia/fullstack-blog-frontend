"use client";

import Link from "next/link";

import { SignBtn } from "../../../components";

import s from "./nav.module.scss";
import CloseSVG from "../../../../public/img/close.svg";

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
  onModalOutsideClick?: () => void;
};

export const Nav: React.FC<NavProps> = ({ onModalOutsideClick }) => {
  return (
    <nav className={s.root}>
      {basicLinks.map((link, i) => (
        <Link key={i} href={link.linkUrl} className={s.link}>
          {link.linkName}
        </Link>
      ))}

      <SignBtn className={s.link} />

      <button onClick={onModalOutsideClick} className={s.close} aria-label="Close this menu.">
        <CloseSVG aria-hidden="true" />
      </button>
    </nav>
  );
};
