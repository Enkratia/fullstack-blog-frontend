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
  id: string;
};

export const Post: React.FC<PostProps> = ({ id }) => {
  const { data: post, isError } = useGetPostByIdQuery(id + "?_increment=views");

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
                sizes="48px"
              />
            </div>

            <div className={s.userData}>
              <Link href={`/author/${post.user.id}`} className={s.userFullname}>
                {post.user.fullname}
              </Link>
              <span className={s.userDate}>{`Posted on ${formatDate2(post.createdAt)}`}</span>
            </div>
          </div>

          <p className={s.title}>{post.title}</p>

          <Link
            href={`/blog/${post.category}`}
            className={`${s.category} ${post.category === "business" ? s.categoryBusiness : ""}`}>
            {icons[post.category]}
            {capitalize(post.category)}
          </Link>
        </div>

        <div className={`${s.imageWrapper} ${cs.container}`}>
          <Image src={post.imageUrl} alt={post.title} className={s.image} fill sizes="100vw" />
        </div>

        <div
          className={`${cs.article} ${cs.container} ${cs.container836}`}
          dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </section>
  );
};
