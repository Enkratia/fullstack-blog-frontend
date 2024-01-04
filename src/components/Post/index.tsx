"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/html";
import Underline from "@tiptap/extension-underline";

import { useGetPostByIdQuery } from "../../redux/backendApi";
import { capitalize, formatDate2 } from "../../utils/customFunctions";

import { PostNotFound } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./post.module.scss";

import Business from "../../../public/img/business.svg";
import Startup from "../../../public/img/startup.svg";
import Economy from "../../../public/img/economy.svg";
import Technology from "../../../public/img/technology.svg";
import DefaultAvatar from "../../../public/img/default/user.png";

// const post: PostType = {
//   id: 6,
//   title: "Step-by-step guide to choosing great font pairs",
//   category: "startup",
//   createdAt: "2023-11-03T17:44:30.644Z",
//   updatedAt: "2023-11-03T17:44:30.644Z",
//   contentText:
//     "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//   contentJson: "",
//   imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
//   tags: ["business, startup"],
//   isFeatured: false,
//   views: 0,
//   user: {
//     id: 1,
//     fullname: "John Doe",
//     email: "email@email.com",
//     imageUrl: "https://i.postimg.cc/B62Mfw3V/baf975398b74732b52898a2562dfa9a6.png",
//     profession: "",
//     company: "",
//     representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//     userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//   },
// };

interface IIcons {
  [key: string]: React.ReactNode;
}

const icons: IIcons = {
  business: <Business aria-hidden="true" />,
  startup: <Startup aria-hidden="true" />,
  economy: <Economy aria-hidden="true" />,
  technology: <Technology aria-hidden="true" />,
};

type PostProps = {
  id: number;
};

export const Post: React.FC<PostProps> = ({ id }) => {
  const { data: post, isError } = useGetPostByIdQuery(id, { skip: typeof +id !== "number" });

  const html = React.useMemo(() => {
    if (!post) return "";

    return generateHTML(JSON.parse(post.contentJson), [StarterKit, Underline]);
  }, [post]);

  if (isError || post === null) {
    return (
      <section className={s.root}>
        <div className={s.container}>
          <div className={`${s.head} ${cs.container}`}>
            <PostNotFound />
          </div>
        </div>
      </section>
    );
  }

  if (!post) {
    return;
  }

  return (
    <section className={s.root}>
      <div className={s.container}>
        <div className={`${s.head} ${cs.container} ${cs.container768}`}>
          <div className={s.user}>
            <div className={s.userImageWrapper}>
              <Image
                src={!!post.user.imageUrl ? post.user.imageUrl : DefaultAvatar}
                alt="Author's picture."
                className={s.userImage}
                fill
              />
            </div>

            <div className={s.userData}>
              <Link href="" className={s.userFullname}>
                {post.user.fullname}
              </Link>
              <span className={s.userDate}>{`Posted on ${formatDate2(post.createdAt)}`}</span>
            </div>
          </div>

          <p className={s.title}>{post.title}</p>

          <Link
            href=""
            className={`${s.category} ${post.category === "business" ? s.categoryBusiness : ""}`}>
            {icons[post.category]}
            {capitalize(post.category)}
          </Link>
        </div>

        <div className={`${s.imageWrapper} ${cs.container}`}>
          <Image src={post.imageUrl} alt={post.title} className={s.image} fill />
        </div>

        <div
          className={`${cs.article} ${cs.container} ${cs.container836}`}
          dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </section>
  );
};

{
  /* <h2 className={cs.articleTitle2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </h2>

          <p className={cs.articleParagraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque
            viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque
            penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo.
            Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque
            non.
          </p>

          <h2 className={cs.articleTitle2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </h2>

          <p className={cs.articleParagraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque
            viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque
            penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo.
            Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque
            non.
          </p>

          <p className={cs.articleParagraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque
            viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque
            penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo.
            Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque
            non.
          </p>

          <ul className={cs.articleList}>
            <li className={cs.articleItem}>Lorem ipsum dolor sit amet</li>
            <li className={cs.articleItem}>Non blandit massa enim nec scelerisque</li>
            <li className={cs.articleItem}>Neque egestas congue quisque egestas</li>
          </ul>

          <p className={cs.articleParagraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque
            viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque
            penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo.
            Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque
            non.
          </p>

          <h2 className={cs.articleTitle2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </h2>

          <p className={cs.articleParagraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque
            viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque
            penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo.
            Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque
            non.
          </p> */
}
