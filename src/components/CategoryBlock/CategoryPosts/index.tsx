import React from "react";

import { Article } from "../../../components";

import s from "./categoryPosts.module.scss";

const posts: PostType[] = [
  {
    id: 1,
    title: "Design tips for designers that cover everything you need",
    category: "startup",
    createdAt: "2023-12-03T17:44:30.644Z",
    updatedAt: "2023-12-03T17:44:30.644Z",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business", "experience"],
    isFeatured: true,
    user: {
      id: 1,
      email: "email@email.com",
      fullname: "John Doe",
      imageUrl: "",
      profession: "",
      company: "",
      representation: "Excepteur sint occaecat cupidatat non proident.",
      userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
    },
  },
  {
    id: 2,
    title: "Design tips for designers that cover everything you need",
    category: "startup",
    createdAt: "2023-12-03T17:44:30.644Z",
    updatedAt: "2023-12-03T17:44:30.644Z",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
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
      representation: "Excepteur sint occaecat cupidatat non proident.",
      userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
    },
  },
  {
    id: 3,
    title: "Design tips for designers that cover everything you need",
    category: "startup",
    createdAt: "2023-12-03T17:44:30.644Z",
    updatedAt: "2023-12-03T17:44:30.644Z",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
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
      representation: "Excepteur sint occaecat cupidatat non proident.",
      userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
    },
  },
  {
    id: 4,
    title: "Design tips for designers that cover everything you need",
    category: "startup",
    createdAt: "2023-12-03T17:44:30.644Z",
    updatedAt: "2023-12-03T17:44:30.644Z",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business", "experience"],
    isFeatured: true,
    user: {
      id: 1,
      fullname: "John Doe",
      imageUrl: "",
      profession: "",
      company: "",
      email: "email@email.com",
      representation: "Excepteur sint occaecat cupidatat non proident.",
      userLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
    },
  },
];

export const CategoryPosts: React.FC = () => {
  return (
    <ul className={s.root}>
      {posts.map((obj) => (
        <li key={obj.id} className={s.item}>
          <Article obj={obj} isCategoryPage={true} />
        </li>
      ))}
    </ul>
  );
};
