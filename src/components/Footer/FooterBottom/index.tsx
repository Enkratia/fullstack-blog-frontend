import React from "react";

import s from "./FooterBottom.module.scss";
import cs from "../../../scss/helpers.module.scss";

import Facebook from "../../../../public/img/facebook.svg";
import Twitter from "../../../../public/img/twitter.svg";
import Instagram from "../../../../public/img/instagram.svg";
import Linkedin from "../../../../public/img/linkedin.svg";

const socialLinks = [
  {
    title: "Facebook",
    icon: <Facebook aria-label="hidden" />,
    linkUrl: "#",
  },
  {
    title: "Twitter",
    icon: <Twitter aria-label="hidden" />,
    linkUrl: "#",
  },
  {
    title: "Instagram",
    icon: <Instagram aria-label="hidden" />,
    linkUrl: "#",
  },
  {
    title: "Linkein",
    icon: <Linkedin aria-label="hidden" />,
    linkUrl: "#",
  },
];

export const FooterBottom: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.info}>
        <span className={s.street}>Finstreet 118 2561 Fintown</span>
        <a href="mailto:hello@finsweet.com" className={s.email}>
          Hello@finsweet.com
        </a>
        <a href="tel:02079932905" className={s.phone}>
          020 7993 2905
        </a>
      </div>

      <ul className={s.social}>
        {socialLinks.map((obj, i) => (
          <li key={i} className={s.socialItem}>
            <a href={obj.linkUrl} className={cs.socialBtn} aria-label={`Go to our ${obj.title}`}>
              {obj.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};