import React from "react";
import Link from "next/link";
import Image from "next/image";

import cs from "../../scss/helpers.module.scss";
import s from "./AuthorCard.module.scss";

import Facebook from "../../../public/img/facebook.svg";
import Twitter from "../../../public/img/twitter.svg";
import Instagram from "../../../public/img/instagram.svg";
import Linkedin from "../../../public/img/linkedin.svg";

// type AuthorsListTitleType = [
//   Record<"facebook", string>,
//   Record<"twitter", string>,
//   Record<"instagram", string>,
//   Record<"linkedin", string>,
// ];

// type AuthorsListItemType = {
//   id: number;
//   imageUrl: string;
//   firstName: string;
//   lastName: string;
//   profession: string;
//   company: string;
//   authorLinks: AuthorsListTitleType;
// };

// type AuthorCardProps = {
//   author: AuthorsListItemType;
// };

type AuthorCardProps = {
  author: AuthorsListItemType;
};

const socialLinks = [
  {
    title: "facebook",
    icon: <Facebook aria-label="hidden" />,
  },
  {
    title: "twitter",
    icon: <Twitter aria-label="hidden" />,
  },
  {
    title: "instagram",
    icon: <Instagram aria-label="hidden" />,
  },
  {
    title: "linkedin",
    icon: <Linkedin aria-label="hidden" />,
  },
];

export const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  const fullname = `${author.firstName} ${author.lastName}`;

  return (
    <article className={s.root}>
      <div className={s.imageWrapper}>
        <Link href="">
          <Image src={author.imageUrl} alt="Avatar of author" className={s.image} fill />
        </Link>
      </div>

      <Link href="">
        <p className={s.fullname}>{`${author.firstName} ${author.lastName}`}</p>
      </Link>
      <span className={s.info}>{`${author.profession} @${author.company}`}</span>

      <ul className={s.social}>
        {author.authorLinks.map((obj, i) => {
          const socialLinkInfo = Object.entries(obj)[0];
          const socialTitle = socialLinkInfo[0];
          const socialLink = socialLinkInfo[1];

          return (
            <li className={s.socialItem}>
              <a
                href={socialLink}
                target="_blank"
                className={`${cs.socialBtn} ${cs.socialBtnDark}`}
                aria-label={`Go to the ${socialTitle} of ${fullname}`}>
                {socialLinks[i].icon}
              </a>
            </li>
          );
        })}
      </ul>
    </article>
  );
};
