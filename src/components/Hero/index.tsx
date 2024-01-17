import React from "react";
import Link from "next/link";
import Image from "next/image";

import { fetchPostsQuery } from "../../fetchApi/fetchApi";

import { formatDate } from "../../utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./hero.module.scss";

// const post: PostType = {
//   id: 1,
//   title: "Step-by-step guide to choosing great font pairs",
//   category: "startup",
//   createdAt: "2023-11-03T17:44:30.644Z",
//   updatedAt: "2023-11-03T17:44:30.644Z",
//   contentText:
//     "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//   contentJson: "",
//   imageUrl: "https://i.postimg.cc/Yq9vxzbW/6846465184684-1000x667.png",
//   tags: ["business", "experience"],
//   isFeatured: true,
//   views: 0,
//   user: {
//     id: 1,
//     fullname: "John Doe",
//     imageUrl: "",
//     profession: "",
//     email: "email@email.com",
//     company: "",
//     representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//     userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
//   },
// };

export const Hero: React.FC = async () => {
  const request = "?isFeatured=true";

  const { data, isError } = await fetchPostsQuery(request);
  const post = data.data[0];

  if (!post) {
    return;
  }

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
            <Link href={`blog/${post.category}/${post.id}`} className={s.titleLink}>
              {post.title}
            </Link>
          </p>

          <div className={`${s.metadata} ${cs.metadata} ${cs.metadataGold}`}>
            <span className={`${s.metadataItem} ${cs.metadataItem} ${cs.metadataItemGold}`}>
              By
              <Link
                href={`/users/${post.user.id}`}
                className={`${cs.metadataName} ${cs.metadataNameGold}`}>{` ${post.user.fullname}`}</Link>
            </span>
            <span className={`${s.metadataItem} ${cs.metadataItem} ${cs.metadataItemGold}`}>
              {formatDate(post.createdAt)}
            </span>
          </div>

          <p className={s.descr}>{post.contentText}</p>

          <Link href="" className={`${s.btn} ${cs.btn}`}>{`Read More >`}</Link>
        </div>
      </div>
    </section>
  );
};
