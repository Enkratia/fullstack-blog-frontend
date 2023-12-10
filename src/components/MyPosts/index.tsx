import React from "react";

import { Article } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./myPosts.module.scss";

const posts: PostType[] = [
  {
    id: 1,
    title: "Font sizes in UI design: The complete guide to follow",
    category: "startup",
    createdAt: "2023-12-03T17:44:30.644Z",
    updatedAt: "2023-12-03T17:44:30.644Z",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business", "experience"],
    isFeatured: true,
    user: {
      id: 1,
      fullname: "John Doe",
      imageUrl: "",
      email: "email@email.com",
      profession: "",
      company: "",
      representation: "Lorem ipsum dolor sit amet, consectetur",
      userLinks: [{ facebook: "" }, { twitter: "" }, { instagram: "" }, { linkedin: "" }],
    },
  },
  {
    id: 2,
    title: "How to build rapport with your web design clients",
    category: "startup",
    createdAt: "2023-12-03T17:44:30.644Z",
    updatedAt: "2023-12-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business", "experience"],
    isFeatured: true,
    user: {
      id: 1,
      fullname: "John Doe",
      imageUrl: "",
      email: "email@email.com",
      profession: "",
      company: "",
      representation: "Lorem ipsum dolor sit amet, consectetur",
      userLinks: [{ facebook: "" }, { twitter: "" }, { instagram: "" }, { linkedin: "" }],
    },
  },
];

export const MyPosts: React.FC = () => {
  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container} ${cs.container1024}`}>
        <h2 className={s.title}>My Posts</h2>

        <ul className={s.list}>
          {posts.map((post) => (
            <li key={post.id} className={s.item}>
              <Article obj={post} isArticlePage={true} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
