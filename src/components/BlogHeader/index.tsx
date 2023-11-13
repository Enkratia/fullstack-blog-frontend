import React from "react";
import Link from "next/link";
import Image from "next/image";

import { formatDate } from "@/utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./BlogHeader.module.scss";

const post = {
  id: 1,
  title: "Step-by-step guide to choosing great font pairs",
  category: "startup",
  firstName: "John",
  lastName: "Doe",
  createdAt: "2023-11-03T17:44:30.644Z",
  updatedAt: "2023-11-03T17:44:30.644Z",
  text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  imageUrl: "https://i.postimg.cc/Yq9vxzbW/6846465184684-1000x667.png",
  tags: ["business", "experience"],
  isFeatured: true,
  authorId: 1,
};

export const BlogHeader: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>{`Featured post: ${post.title}`}</h2>

      <div className={`${s.container} ${cs.container}`}>
        <div className={s.left}>
          <span className={s.subtitle}>Featured post</span>
          <h3 className={`${s.title} ${cs.title}`}>{post.title}</h3>

          <div className={cs.metadata}>
            <span className={cs.metadataItem}>
              By
              <Link
                href={`/users/${post.authorId}`}
                className={cs.metadataName}>{` ${post.firstName} ${post.lastName}`}</Link>
            </span>
            <span className={cs.metadataItem}>{formatDate(post.createdAt)}</span>
          </div>

          <p className={s.text}>{post.text}</p>
          <Link href={`/blog/${post.id}`} className={`${s.link} ${cs.btn}`}>{`Read More >`}</Link>
        </div>

        <div className={s.right}>
          <div className={s.imageWrapper}>
            <Image src={post.imageUrl} alt="Image of the post." className={s.image} fill />
          </div>
        </div>
      </div>
    </section>
  );
};
