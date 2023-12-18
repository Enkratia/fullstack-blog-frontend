import React from "react";
import Image from "next/image";

import cs from "../../scss/helpers.module.scss";
import s from "./authorHeader.module.scss";

import Facebook from "../../../public/img/facebook.svg";
import Twitter from "../../../public/img/twitter.svg";
import Instagram from "../../../public/img/instagram.svg";
import Linkedin from "../../../public/img/linkedin.svg";

const socialIcons = [
  {
    icon: <Facebook aria-hidden="true" />,
  },
  {
    icon: <Twitter aria-hidden="true" />,
  },
  {
    icon: <Instagram aria-hidden="true" />,
  },
  {
    icon: <Linkedin aria-hidden="true" />,
  },
];

const user: UserType = {
  id: 1,
  imageUrl: "https://i.postimg.cc/7YBBcBS5/5b103af032f344457c097e10aa7ebd86.png",
  fullname: "Floyd Miles",
  profession: "Content Writer",
  company: "Company",
  email: "email@email.com",
  representation:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.",
  userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
  posts: [],
};

export const AuthorHeader: React.FC = () => {
  const fullname = `${user.fullname}`;

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>{`Information about ${fullname}.`}</h2>

      <div className={`${s.container} ${cs.container} ${cs.container1024}`}>
        <div className={s.imageWrapper}>
          <div className={s.imageWrapperInner}>
            <Image src={user.imageUrl} alt={`Picture of ${fullname}`} className={s.image} fill />
          </div>
        </div>

        <div className={s.text}>
          <p className={s.title}>{`Hey there, I’m ${fullname} and welcome to my Blog`}</p>

          <p className={s.descr}>{user.representation}</p>

          <ul className={s.social}>
            {Object.entries(user.userLinks).map(([socialTitle, socialLink], i) => {
              if (socialLink === "") return;

              return (
                <li key={i} className={s.socialItem}>
                  <a
                    href={socialLink}
                    target="_blank"
                    className={`${cs.socialBtn} ${cs.socialBtnDark}`}
                    aria-label={`Go to the ${socialTitle} of ${fullname}`}>
                    {socialIcons[i].icon}
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
