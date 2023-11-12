import React from "react";
import Link from "next/link";

import s from "./FooterTop.module.scss";
import cs from "../../../scss/helpers.module.scss";
import Logo from "../../../../public/img/logo.svg";

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
  {
    linkUrl: "/privacy-policy",
    linkName: "Privacy Policy",
  },
];

export const FooterTop: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Link href="/" className={s.logoLink} aria-label="Go to home page.">
          <Logo className={s.logo} aria-hidden="true" />
        </Link>

        <nav className={s.nav}>
          {basicLinks.map((link, i) => (
            <Link key={i} href={link.linkUrl} className={s.link}>
              {link.linkName}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
