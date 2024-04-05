import { Metadata } from "next";

import { BlogHeader, AllPosts, AllCategories, Join } from "../../components";

import cs from "../../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "Blog",
  description: "Page where you can see all our posts.",
};

type BlogPageProps = {
  searchParams: Record<string, string>;
};

import qs from "qs";
import { fetchPostsQuery } from "../../fetchApi/fetchApi";
const limit = 5;

const BlogPage: React.FC<BlogPageProps> = async ({ searchParams }) => {
  const urlSearch = qs.parse(searchParams, { arrayLimit: 1000 });
  const urlPage = Number(urlSearch._page || "1");
  const request = `?_page=${urlPage}&_limit=${limit}&_sort=createdAt&_order=DESC`;

  const { data } = await fetchPostsQuery(request);

  return (
    <main>
      <h1 className={cs.srOnly}>Blog page</h1>
      <BlogHeader />

      {/* <AllPostsLayer searchParams={searchParams} /> */}
      <AllPosts data={data} searchParams={searchParams} />
      <AllCategories />
      <Join />
    </main>
  );
};

export default BlogPage;
