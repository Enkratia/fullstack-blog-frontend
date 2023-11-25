import React from "react";
import { notFound, useParams } from "next/navigation";

import { CategoryCategories, CategoryPosts, CategoryTags } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./CategoryBlock.module.scss";
import Close from "../../../public/img/close.svg";

const categories = ["startup", "business", "economy", "technology"];

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
      imageUrl: "",
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

export const CategoryBlock: React.FC = () => {
  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <CategoryPosts />

        <div className={s.sidebarWrapper}>
          <aside className={s.sidebar}>
            <CategoryCategories />
            <CategoryTags />

            <button className={s.close} aria-label="Close the modal window.">
              <Close aria-hidden="true" />
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};
