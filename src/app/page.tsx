import React from "react";
import { Metadata } from "next";

import {
  ChooseCategory,
  FeaturedIn,
  FeaturedPosts,
  Hero,
  Join,
  ListAuthors,
  Testimonials,
  UsMission,
  WhyWeStarted,
} from "../components";

import cs from "../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "Finsweet",
  description:
    "Finsweet is a social publishing platform that is open to all and home to a diverse array of stories, ideas and perspectives.",
};

export default function Home() {
  return (
    <main>
      <h1 className={cs.srOnly}>Finsweet`s home page.</h1>

      <Hero />
      <FeaturedPosts />
      <UsMission />
      <ChooseCategory />
      <WhyWeStarted />
      <ListAuthors />
      <FeaturedIn />
      <Testimonials />
      <Join />
    </main>
  );
}

// await new Promise((resolve) => {
//   setTimeout(() => resolve(""), 6000);
// });

// const a = await fetch("https://dummyjson.com/quotes");
// const b = await fetch("https://dummyjson.com/comments");
// const c = await fetch("https://dummyjson.com/posts");
// const d = await fetch("https://dummyjson.com/users");
// const e = await fetch("https://dummyjson.com/products");
