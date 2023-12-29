import React from "react";
import Link from "next/link";
import Image from "next/image";

import cs from "../../scss/helpers.module.scss";
import s from "./authorCard.module.scss";

import Facebook from "../../../public/img/facebook.svg";
import Twitter from "../../../public/img/twitter.svg";
import Instagram from "../../../public/img/instagram.svg";
import Linkedin from "../../../public/img/linkedin.svg";

import DefaultAvatar from "../../../public/img/default/user.png";

const socialIcons = [
  {
    title: "facebook",
    icon: <Facebook aria-hidden="true" />,
  },
  {
    title: "twitter",
    icon: <Twitter aria-hidden="true" />,
  },
  {
    title: "instagram",
    icon: <Instagram aria-hidden="true" />,
  },
  {
    title: "linkedin",
    icon: <Linkedin aria-hidden="true" />,
  },
];

type AuthorCardProps = {
  author: UserType;
};

export const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  const fullname = `${author.fullname}`;

  return (
    <article className={s.root}>
      <div className={s.imageWrapper}>
        <Link href="">
          <Image
            src={!!author.imageUrl ? author.imageUrl : DefaultAvatar}
            alt="Avatar of author"
            className={s.image}
            fill
          />
        </Link>
      </div>

      <Link href="">
        <p className={s.fullname}>{`${author.fullname}`}</p>
      </Link>
      <span className={s.info}>{`${author.profession} @${author.company}`}</span>

      <ul className={s.social}>
        {socialIcons.map(({ title, icon }, i) => {
          const link = author.userLinks[title];
          if (link === "") return;

          return (
            <li key={i} className={s.socialItem}>
              <a
                href={link}
                target="_blank"
                className={`${cs.socialBtn} ${cs.socialBtnDark}`}
                aria-label={`Go to the ${title} of ${fullname}`}>
                {icon}
              </a>
            </li>
          );
        })}
      </ul>
    </article>
  );
};
