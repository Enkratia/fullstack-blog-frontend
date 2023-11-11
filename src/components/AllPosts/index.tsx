import React from "react";
import Link from "next/link";
import Image from "next/image";

import cs from "../../scss/helpers.module.scss";
import s from "./AllPosts.module.scss";

const posts = [
  {
    id: 1,
    title: "Design tips for designers that cover everything you need",
    category: "startup",
    firstName: "John",
    lastName: "Doe",
    createdAt: "2023-12-03T17:44:30.644Z",
    updatedAt: "2023-12-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business", "experience"],
    isFeatured: true,
    authorId: 1,
  },
  {
    id: 2,
    title: "How to build rapport with your web design clients",
    category: "business",
    firstName: "John",
    lastName: "Doe",
    createdAt: "2023-11-03T17:44:30.644Z",
    updatedAt: "2023-11-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business", "experience"],
    isFeatured: false,
    authorId: 1,
  },
  {
    id: 3,
    title: "Logo design trends to avoid in 2022",
    category: "startup",
    firstName: "John",
    lastName: "Doe",
    createdAt: "2023-13-03T17:44:30.644Z",
    updatedAt: "2023-13-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["experience"],
    isFeatured: false,
    authorId: 1,
  },
  {
    id: 4,
    title: "8 Figma design systems you can download for free today",
    category: "technology",
    firstName: "John",
    lastName: "Doe",
    createdAt: "2023-14-03T17:44:30.644Z",
    updatedAt: "2023-14-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business", "experience"],
    isFeatured: false,
    authorId: 1,
  },
  {
    id: 5,
    title: "Font sizes in UI design: The complete guide to follow",
    category: "economy",
    firstName: "John",
    lastName: "Doe",
    createdAt: "2023-15-03T17:44:30.644Z",
    updatedAt: "2023-15-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["experience"],
    isFeatured: false,
    authorId: 1,
  },
  // {
  //   id: 6,
  //   title: "Step-by-step guide to choosing great font pairs",
  //   category: "startup",
  //   firstName: "John",
  //   lastName: "Doe",
  //   createdAt: "2023-16-03T17:44:30.644Z",
  //   updatedAt: "2023-16-03T17:44:30.644Z",
  //   text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  //   imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
  //   tags: ["business"],
  //   isFeatured: false,
  //   authorId: 1,
  // },
];

export const AllPosts: React.FC = () => {
  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <h2 className={s.title}>All posts</h2>
        <div className={s.posts}>
          {posts.map((obj) => (
            <article key={obj.id} className={s.post}>
              <div className={s.imageWrapper}>
                <div className={s.imageWrapperInner}>
                  <Link href="" aria-label="Go to the post.">
                    <Image src={obj.imageUrl} alt={obj.title} fill className={s.image} />
                  </Link>
                </div>
              </div>

              <div className={s.data}>
                <span className={s.dataCategory}>{obj.category}</span>
                <h3 className={`${s.dataTitle} ${cs.title}`}>
                  <Link href="">{obj.title}</Link>
                </h3>
                <p className={s.dataText}>{obj.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className={s.navigation}>
          <Link
            href="#"
            className={`${s.navigationLink} ${s.navigationLinkInactive}`}>{`< Prev`}</Link>
          <Link href="#" className={s.navigationLink}>{`Next >`}</Link>
        </div>
      </div>
    </section>
  );
};
