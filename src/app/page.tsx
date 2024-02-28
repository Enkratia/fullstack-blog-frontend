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
