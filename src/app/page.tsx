import React from "react";

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

// await fetch("https://dummyjson.com/products");
// await fetch("https://dummyjson.com/carts");
// await fetch("https://dummyjson.com/users");
// await fetch("https://dummyjson.com/posts");
// await fetch("https://dummyjson.com/comments");
// await fetch("https://dummyjson.com/quotes");
// await fetch("https://dummyjson.com/recipes");
// await fetch("https://dummyjson.com/todos");
