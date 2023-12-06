import React from "react";
import Link from "next/link";

import { SignBtn } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./header.module.scss";
import Logo from "../../../public/img/logo.svg";

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

export const Header: React.FC = () => {
  return (
    <header className={s.root}>
      <div className={s.wrapper}>
        <div className={`${s.container} ${cs.container}`}>
          <Link href="/" className={s.logoLink} aria-label="Go to home page.">
            <Logo className={s.logo} aria-hidden="true" />
          </Link>

          <nav className={s.nav}>
            {basicLinks.map((link, i) => (
              <Link key={i} href={link.linkUrl} className={s.link}>
                {link.linkName}
              </Link>
            ))}

            <SignBtn className={s.link} />
          </nav>

          <Link href="#subscribe-form" className={`${cs.btn} ${cs.btnWhite}`}>
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  );
};
