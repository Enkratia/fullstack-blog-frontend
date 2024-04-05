import React from "react";

import { AllPosts } from "../../components";
import { fetchPostsQuery } from "../../fetchApi/fetchApi";

import qs from "qs";

type AllPostsLayerProps = {
  searchParams: Record<string, string>;
};

export const AllPostsLayer: React.FC<AllPostsLayerProps> = async ({ searchParams }) => {
  const limit = 5;
  console.log(searchParams);
  const urlSearch = qs.parse(searchParams, { arrayLimit: 1000 });
  const urlPage = Number(urlSearch._page || "1");
  const request = `?_page=${urlPage}&_limit=${limit}&_sort=createdAt&_order=DESC`;

  const { data, isError } = await fetchPostsQuery(request);

  if (!data || isError) return "";

  return <AllPosts data={data} searchParams={searchParams} />;
};
