import React from "react";
import Link from "next/link";
import Image from "next/image";

import { formatDate } from "@/utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./Hero.module.scss";

const post = {
  id: 1,
  title: "Step-by-step guide to choosing great font pairs",
  category: "startup",
  firstName: "James",
  lastName: "West",
  createdAt: "2023-11-03T17:44:30.644Z",
  updatedAt: "2023-11-03T17:44:30.644Z",
  text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  imageUrl: "https://i.postimg.cc/Yq9vxzbW/6846465184684-1000x667.png",
  tags: ["business", "experience"],
  isFeatured: true,
  authorId: 1,
};

export const Hero: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>{post.title}</h2>
      <div className={`${s.container} ${cs.container}`}>
        <Image src={post.imageUrl} alt={post.title} className={s.image} aria-hidden="true" fill />

        <div className={s.content}>
          <span className={s.subtitle}>
            Posted on<Link href="" className={s.category}>{` ${post.category}`}</Link>
          </span>
          <p className={`${s.title} ${cs.title}`}>
            <Link href="" className={s.titleLink}>
              {post.title}
            </Link>
          </p>

          <div className={`${s.metadata} ${cs.metadata} ${cs.metadataGold}`}>
            <span className={`${s.metadataItem} ${cs.metadataItem} ${cs.metadataItemGold}`}>
              By
              <Link
                href={`/users/${post.authorId}`}
                className={`${cs.metadataName} ${cs.metadataNameGold}`}>{` ${post.firstName} ${post.lastName}`}</Link>
            </span>
            <span className={`${s.metadataItem} ${cs.metadataItem} ${cs.metadataItemGold}`}>
              {formatDate(post.createdAt)}
            </span>
          </div>

          <p className={s.descr}>{post.text}</p>

          <Link href="" className={`${s.btn} ${cs.btn}`}>{`Read More >`}</Link>
        </div>
      </div>
    </section>
  );
};
