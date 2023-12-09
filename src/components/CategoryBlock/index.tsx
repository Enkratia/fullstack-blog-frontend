import React from "react";

import s from "./categoryBlock.module.scss";
import { CategoryLayer } from "../../components";

// const categories = ["startup", "business", "economy", "technology"];

// const posts: PostType[] = [
//   {
//     id: 1,
//     title: "Design tips for designers that cover everything you need",
//     category: "startup",
//     createdAt: "2023-12-03T17:44:30.644Z",
//     updatedAt: "2023-12-03T17:44:30.644Z",
//     text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
//     tags: ["business", "experience"],
//     isFeatured: true,
//     user: {
//       id: 1,
//       fullname: "John Doe",
//       imageUrl: "",
//       profession: "",
//       company: "",
//       representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//       userLinks: [{ facebook: "" }, { twitter: "" }, { instagram: "" }, { linkedin: "" }],
//     },
//   },
//   {
//     id: 2,
//     title: "Design tips for designers that cover everything you need",
//     category: "startup",
//     createdAt: "2023-12-03T17:44:30.644Z",
//     updatedAt: "2023-12-03T17:44:30.644Z",
//     text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
//     tags: ["business", "experience"],
//     isFeatured: true,
//     user: {
//       id: 1,
//       fullname: "John Doe",
//       imageUrl: "",
//       profession: "",
//       company: "",
//       representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//       userLinks: [{ facebook: "" }, { twitter: "" }, { instagram: "" }, { linkedin: "" }],
//     },
//   },
//   {
//     id: 3,
//     title: "Design tips for designers that cover everything you need",
//     category: "startup",
//     createdAt: "2023-12-03T17:44:30.644Z",
//     updatedAt: "2023-12-03T17:44:30.644Z",
//     text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
//     tags: ["business", "experience"],
//     isFeatured: true,
//     user: {
//       id: 1,
//       fullname: "John Doe",
//       imageUrl: "",
//       profession: "",
//       company: "",
//       representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//       userLinks: [{ facebook: "" }, { twitter: "" }, { instagram: "" }, { linkedin: "" }],
//     },
//   },
//   {
//     id: 4,
//     title: "Design tips for designers that cover everything you need",
//     category: "startup",
//     createdAt: "2023-12-03T17:44:30.644Z",
//     updatedAt: "2023-12-03T17:44:30.644Z",
//     text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
//     tags: ["business", "experience"],
//     isFeatured: true,
//     user: {
//       id: 1,
//       fullname: "John Doe",
//       imageUrl: "",
//       profession: "",
//       company: "",
//       representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//       userLinks: [{ facebook: "" }, { twitter: "" }, { instagram: "" }, { linkedin: "" }],
//     },
//   },
//   {
//     id: 5,
//     title: "Design tips for designers that cover everything you need",
//     category: "startup",
//     createdAt: "2023-12-03T17:44:30.644Z",
//     updatedAt: "2023-12-03T17:44:30.644Z",
//     text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
//     imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
//     tags: ["business", "experience"],
//     isFeatured: true,
//     user: {
//       id: 1,
//       fullname: "John Doe",
//       imageUrl: "",
//       profession: "",
//       company: "",
//       representation: "Excepteur sint occaecat cupidatat non proident. Duis aute",
//       userLinks: [{ facebook: "" }, { twitter: "" }, { instagram: "" }, { linkedin: "" }],
//     },
//   },
// ];

export const CategoryBlock: React.FC = () => {
  return (
    <section className={s.root}>
      <CategoryLayer />
    </section>
  );
};
