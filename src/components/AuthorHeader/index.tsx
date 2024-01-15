"use client";

import React from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";

import { useGetUserByIdQuery } from "../../redux/backendApi";

import cs from "../../scss/helpers.module.scss";
import s from "./authorHeader.module.scss";

import Facebook from "../../../public/img/facebook.svg";
import Twitter from "../../../public/img/twitter.svg";
import Instagram from "../../../public/img/instagram.svg";
import Linkedin from "../../../public/img/linkedin.svg";
import DefaultImage from "../../../public/img/default/user.png";

const socialIcons = {
  facebook: <Facebook aria-hidden="true" />,
  twitter: <Twitter aria-hidden="true" />,
  instagram: <Instagram aria-hidden="true" />,
  linkedin: <Linkedin aria-hidden="true" />,
};

// const user: UserType = {
//   id: 1,
//   imageUrl: "https://i.postimg.cc/7YBBcBS5/5b103af032f344457c097e10aa7ebd86.png",
//   fullname: "Floyd Miles",
//   profession: "Content Writer",
//   company: "Company",
//   email: "email@email.com",
//   representation:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.",
//   userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//   posts: [],
// };

export const AuthorHeader: React.FC = () => {
  const { id } = useParams();

  const { data: user, isError } = useGetUserByIdQuery(id as string);

  if (isError) {
    notFound();
  }

  if (!user) {
    return;
  }

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>{`Information about ${user.fullname}.`}</h2>

      <div className={`${s.container} ${cs.container} ${cs.container1024}`}>
        <div className={s.imageWrapper}>
          <div className={s.imageWrapperInner}>
            <Image
              src={user.imageUrl ? user.imageUrl : DefaultImage}
              alt={`Picture of ${user.fullname}`}
              className={s.image}
              fill
            />
          </div>
        </div>

        <div className={s.text}>
          <p className={s.title}>{`Hey there, I’m ${user.fullname} and welcome to my Blog`}</p>

          <p className={s.descr}>{user.representation}</p>

          <ul className={s.social}>
            {Object.entries(socialIcons).map(([title, icon], i) => {
              const link = user.userLinks[title];
              if (link === "") return;

              return (
                <li key={i} className={s.socialItem}>
                  <a
                    href={link}
                    target="_blank"
                    className={`${cs.socialBtn} ${cs.socialBtnDark}`}
                    aria-label={`Go to the ${title} of ${user.fullname}`}>
                    {icon}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={`${s.decoration} ${cs.decoration}`}>
          <span className={`${cs.decorationItem} ${cs.decorationItemYellow}`}></span>
          <span className={`${cs.decorationItem} ${cs.decorationItemYellow}`}></span>
        </div>
      </div>
    </section>
  );
};
