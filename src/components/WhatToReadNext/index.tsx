import React from "react";

import cs from "../../scss/helpers.module.scss";
import s from "./WhatToReadNext.module.scss";
import { WhatToReadNextSlider } from "./WhatToReadNextSlider";

const nextPosts = [
  {
    id: 1,
    title: "A UX Case Study Creating a Studious Environment for Students: ",
    category: "startup",
    createdAt: "2021-08-03T17:44:30.644Z",
    updatedAt: "2023-11-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business, startup"],
    isFeatured: false,
    user: {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      imageUrl: "https://i.postimg.cc/B62Mfw3V/baf975398b74732b52898a2562dfa9a6.png",
    },
  },
  {
    id: 2,
    title: "A UX Case Study Creating a Studious Environment for Students: ",
    category: "startup",
    createdAt: "2023-11-03T17:44:30.644Z",
    updatedAt: "2023-11-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business, startup"],
    isFeatured: false,
    user: {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      imageUrl: "https://i.postimg.cc/B62Mfw3V/baf975398b74732b52898a2562dfa9a6.png",
    },
  },
  {
    id: 3,
    title: "A UX Case Study Creating a Studious Environment for Students: ",
    category: "startup",
    createdAt: "2023-11-03T17:44:30.644Z",
    updatedAt: "2023-11-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business, startup"],
    isFeatured: false,
    user: {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      imageUrl: "https://i.postimg.cc/B62Mfw3V/baf975398b74732b52898a2562dfa9a6.png",
    },
  },
  {
    id: 4,
    title: "A UX Case Study Creating a Studious Environment for Students: ",
    category: "startup",
    createdAt: "2023-11-03T17:44:30.644Z",
    updatedAt: "2023-11-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business, startup"],
    isFeatured: false,
    user: {
      id: 3,
      firstName: "John",
      lastName: "Doe",
      imageUrl: "https://i.postimg.cc/B62Mfw3V/baf975398b74732b52898a2562dfa9a6.png",
    },
  },
  {
    id: 5,
    title: "A UX Case Study Creating a Studious Environment for Students: ",
    category: "startup",
    createdAt: "2023-11-03T17:44:30.644Z",
    updatedAt: "2023-11-03T17:44:30.644Z",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    imageUrl: "https://i.postimg.cc/2yy6jCt5/6168465168-2250x1500.png",
    tags: ["business, startup"],
    isFeatured: false,
    user: {
      id: 3,
      firstName: "John",
      lastName: "Doe",
      imageUrl: "https://i.postimg.cc/B62Mfw3V/baf975398b74732b52898a2562dfa9a6.png",
    },
  },
];

export const WhatToReadNext: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>List of related posts.</h2>

      <div className={`${s.container} ${cs.container}`}>
        <p className={`${s.title} ${cs.title}`}>What to read next</p>

        <WhatToReadNextSlider nextPosts={nextPosts} />
      </div>
    </section>
  );
};