import React from "react";
import Link from "next/link";
import Image from "next/image";

import { formatDate } from "@/utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./FeaturedPosts.module.scss";

const allPosts = [
  {
    id: 1,
    title: "8 Figma design systems that you can download for free today.",
    category: "startup",
    firstName: "James",
    lastName: "West",
    createdAt: "2023-11-03T17:44:30.644Z",
    updatedAt: "2023-11-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/Yq9vxzbW/6846465184684-1000x667.png",
    tags: ["business", "experience"],
    isFeatured: false,
    authorId: 1,
  },
  {
    id: 2,
    title: "8 Figma design systems that you can download for free today.",
    category: "startup",
    firstName: "James",
    lastName: "West",
    createdAt: "2023-11-03T17:44:30.644Z",
    updatedAt: "2023-11-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/Yq9vxzbW/6846465184684-1000x667.png",
    tags: ["business", "experience"],
    isFeatured: false,
    authorId: 1,
  },
  {
    id: 3,
    title: "8 Figma design systems that you can download for free today.",
    category: "startup",
    firstName: "James",
    lastName: "West",
    createdAt: "2023-11-03T17:44:30.644Z",
    updatedAt: "2023-11-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/Yq9vxzbW/6846465184684-1000x667.png",
    tags: ["business", "experience"],
    isFeatured: false,
    authorId: 1,
  },
  {
    id: 4,
    title: "8 Figma design systems that you can download for free today.",
    category: "startup",
    firstName: "James",
    lastName: "West",
    createdAt: "2023-11-03T17:44:30.644Z",
    updatedAt: "2023-11-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/Yq9vxzbW/6846465184684-1000x667.png",
    tags: ["business", "experience"],
    isFeatured: false,
    authorId: 1,
  },
];

const post = {
  id: 1,
  title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
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

export const FeaturedPosts: React.FC = () => {
  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <div className={s.featured}>
          <h2 className={`${s.featuredTitle} ${cs.title}`}>Featured Post</h2>

          <div className={s.featuredContent}>
            <div className={s.featuredImageWrapper}>
              <div className={s.featuredImageWrapperInner}>
                <Image src={post.imageUrl} alt={post.title} fill className={s.featuredImage} />
              </div>
            </div>

            <div className={`${s.featuredMetadata} ${cs.metadata}`}>
              <span className={cs.metadataItem}>
                By
                <Link
                  href={`/users/${post.authorId}`}
                  className={cs.metadataName}>{` ${post.firstName} ${post.lastName}`}</Link>
              </span>
              <span className={cs.metadataItem}>{formatDate(post.createdAt)}</span>
            </div>

            <Link href="" className={s.featuredTitleSecondLink}>
              <h3 className={s.featuredTitleSecond}>{post.title}</h3>
            </Link>

            <p className={s.featuredDescr}>{post.text}</p>

            <Link href="" className={`${s.btn} ${cs.btn}`}>{`Read More >`}</Link>
          </div>
        </div>

        <div className={s.all}>
          <div className={s.allHead}>
            <h2 className={`${s.allTitle} ${cs.title}`}>All Posts</h2>
            <Link href="" className={s.allView}>
              View All
            </Link>
          </div>

          <ul className={s.allList}>
            {allPosts.map((obj) => (
              <li key={obj.id} className={s.allItem}>
                <article className={s.allPost}>
                  <div className={`${s.allMetadata} ${cs.metadata}`}>
                    <span className={cs.metadataItem}>
                      By
                      <Link
                        href={`/users/${obj.authorId}`}
                        className={cs.metadataName}>{` ${post.firstName} ${obj.lastName}`}</Link>
                    </span>
                    <span className={cs.metadataItem}>{formatDate(obj.createdAt)}</span>
                  </div>

                  <Link href="" className={s.allTitleSecondLink}>
                    <p className={s.allTitleSecond}>{obj.title}</p>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
