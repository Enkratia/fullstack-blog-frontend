import React, { Suspense } from "react";

import {
  ChooseCategory,
  FeaturedIn,
  FeaturedPosts,
  Hero,
  Join,
  ListAuthors,
  SkeletonHero,
  Testimonials,
  UsMission,
  WhyWeStarted,
} from "../components";

import cs from "../scss/helpers.module.scss";

export default function Home() {
  return (
    <main>
      <h1 className={cs.srOnly}>Finsweet`s home page.</h1>
      <Suspense fallback={<SkeletonHero />}>
        <Hero />
      </Suspense>

      <FeaturedPosts />

      {/* <Suspense fallback={<div>LOADING</div>}> */}
      <UsMission />
      {/* </Suspense> */}

      {/* <Suspense fallback={<div>LOADING</div>}> */}
      <ChooseCategory />
      {/* </Suspense> */}

      {/* <Suspense fallback={<div>LOADING</div>}> */}
      <WhyWeStarted />
      {/* </Suspense> */}

      <ListAuthors />
      <FeaturedIn />
      <Testimonials />

      {/* <Suspense fallback={<div>LOADING</div>}> */}
      <Join />
      {/* </Suspense> */}
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
