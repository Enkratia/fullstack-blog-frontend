import React from "react";
import Link from "next/link";

import { Article } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./allPosts.module.scss";

const posts: PostType[] = [
  {
    id: 1,
    title: "Design tips for designers that cover everything you need",
    category: "startup",
    createdAt: "2023-12-03T17:44:30.644Z",
    updatedAt: "2023-12-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business", "experience"],
    isFeatured: true,
    user: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imageUrl: "https://i.postimg.cc/B62Mfw3V/baf975398b74732b52898a2562dfa9a6.png",
      profession: "",
      company: "",
      representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
      userLinks: [{ facebook: "" }, { twitter: "" }, { instagram: "" }, { linkedin: "" }],
    },
  },
  {
    id: 2,
    title: "Design tips for designers that cover everything you need",
    category: "startup",
    createdAt: "2023-12-03T17:44:30.644Z",
    updatedAt: "2023-12-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business", "experience"],
    isFeatured: true,
    user: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imageUrl: "",
      profession: "",
      company: "",
      representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
      userLinks: [{ facebook: "" }, { twitter: "" }, { instagram: "" }, { linkedin: "" }],
    },
  },
  {
    id: 3,
    title: "Design tips for designers that cover everything you need",
    category: "startup",
    createdAt: "2023-12-03T17:44:30.644Z",
    updatedAt: "2023-12-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business", "experience"],
    isFeatured: true,
    user: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imageUrl: "",
      profession: "",
      company: "",
      representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
      userLinks: [{ facebook: "" }, { twitter: "" }, { instagram: "" }, { linkedin: "" }],
    },
  },
  {
    id: 4,
    title: "Design tips for designers that cover everything you need",
    category: "startup",
    createdAt: "2023-12-03T17:44:30.644Z",
    updatedAt: "2023-12-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business", "experience"],
    isFeatured: true,
    user: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imageUrl: "",
      profession: "",
      company: "",
      representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
      userLinks: [{ facebook: "" }, { twitter: "" }, { instagram: "" }, { linkedin: "" }],
    },
  },
  {
    id: 5,
    title: "Design tips for designers that cover everything you need",
    category: "startup",
    createdAt: "2023-12-03T17:44:30.644Z",
    updatedAt: "2023-12-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business", "experience"],
    isFeatured: true,
    user: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      imageUrl: "",
      profession: "",
      company: "",
      representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
      userLinks: [{ facebook: "" }, { twitter: "" }, { instagram: "" }, { linkedin: "" }],
    },
  },
];

export const AllPosts: React.FC = () => {
  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <h2 className={s.title}>All posts</h2>
        <div className={s.posts}>
          {posts.map((obj) => (
            <Article key={obj.id} obj={obj} />
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
