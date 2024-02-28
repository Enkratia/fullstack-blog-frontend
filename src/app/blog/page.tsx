import { Metadata } from "next";

import { BlogHeader, AllPosts, AllCategories, Join } from "../../components";

import cs from "../../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <main>
      <h1 className={cs.srOnly}>Blog page</h1>
      <BlogHeader />
      <AllPosts />
      <AllCategories />
      <Join />
    </main>
  );
}
