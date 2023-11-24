import React from "react";
import Image from "next/image";
import Link from "next/link";

// import { MDXRemote } from 'next-mdx-remote'
// import ReactMarkdown from "react-markdown";

import { capitalize, formatDate2 } from "../../utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./Post.module.scss";

import Business from "../../../public/img/business.svg";
import Startup from "../../../public/img/startup.svg";
import Economy from "../../../public/img/economy.svg";
import Technology from "../../../public/img/technology.svg";

const post = {
  id: 6,
  title: "Step-by-step guide to choosing great font pairs",
  category: "startup",
  createdAt: "2023-11-03T17:44:30.644Z",
  updatedAt: "2023-11-03T17:44:30.644Z",
  text: "### Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
  imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
  tags: ["business, startup"],
  isFeatured: false,
  user: {
    authorId: 2,
    firstName: "Andrew",
    lastName: "Jonson",
    imageUrl: "https://i.postimg.cc/B62Mfw3V/baf975398b74732b52898a2562dfa9a6.png",
  },
};

interface IIcons {
  [key: string]: React.ReactNode;
}

const icons: IIcons = {
  business: <Business aria-hidden="true" />,
  startup: <Startup aria-hidden="true" />,
  economy: <Economy aria-hidden="true" />,
  technology: <Technology aria-hidden="true" />,
};

export const Post: React.FC = () => {
  return (
    <section className={s.root}>
      <div className={s.container}>
        <div className={`${s.head} ${cs.container} ${cs.container768}`}>
          <div className={s.user}>
            <div className={s.userImageWrapper}>
              <Image
                src={post.user.imageUrl}
                alt="Author's picture."
                className={s.userImage}
                fill
              />
            </div>

            <div className={s.userData}>
              <Link
                href=""
                className={s.userFullname}>{`${post.user.firstName} ${post.user.lastName}`}</Link>
              <span className={s.userDate}>{`Posted on ${formatDate2(post.createdAt)}`}</span>
            </div>
          </div>

          <h2 className={s.title}>{post.title}</h2>

          <Link href="" className={s.category}>
            {icons[post.category]}
            {capitalize(post.category)}
          </Link>
        </div>

        <div className={`${s.imageWrapper} ${cs.container}`}>
          <Image src={post.imageUrl} alt={post.title} className={s.image} fill />
        </div>

        <div className={`${s.article} ${cs.container} ${cs.container836}`}>
          <h3 className={s.articleTitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </h3>

          <p className={s.articleParagraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque
            viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque
            penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo.
            Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque
            non.
          </p>

          <h3 className={s.articleTitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </h3>

          <p className={s.articleParagraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque
            viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque
            penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo.
            Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque
            non.
          </p>

          <p className={s.articleParagraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque
            viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque
            penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo.
            Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque
            non.
          </p>

          <ul className={s.articleList}>
            <li className={s.articleItem}>Lorem ipsum dolor sit amet</li>
            <li className={s.articleItem}>Non blandit massa enim nec scelerisque</li>
            <li className={s.articleItem}>Neque egestas congue quisque egestas</li>
          </ul>

          <p className={s.articleParagraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque
            viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque
            penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo.
            Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque
            non.
          </p>

          <h3 className={s.articleTitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </h3>

          <p className={s.articleParagraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque
            viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque
            penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo.
            Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque
            non.
          </p>
        </div>
      </div>
    </section>
  );
};