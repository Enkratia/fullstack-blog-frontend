"use server";

import { GetPostsType } from "../redux/backendApi/types";

import { BACKEND_URL } from "../utils/constants";

const fetchApi = async (query: string) => {
  const args = `${BACKEND_URL}/${query}`;

  try {
    const response = await fetch(args, {
      next: { tags: [query] },
      cache: "no-store",
    });

    if (!response.ok) {
      return { isError: true, args };
    }

    const data = await response.json();

    return { isError: false, data, args };
  } catch (error) {
    return { isError: true, args };
  }
};

// Common
export const fetchCategoryDescriptionQuery = async () => {
  const res = await fetchApi("category-description");

  return {
    ...res,
    data: res?.data?.[0] as CategoryDescriptionType,
  };
  // return { isError: res?.isError, data: res?.data?.[0] as CategoryDescriptionType };
};

export const fetchJoinQuery = async () => {
  const res = await fetchApi("join");

  return {
    ...res,
    data: res?.data?.[0] as JoinType,
  };
  // return { isError: res?.isError, data: res?.data?.[0] as JoinType };
};

export const fetchPostsQuery = async (request: string) => {
  const res = await fetchApi(`posts${request}`);

  return {
    ...res,
    data: res?.data as GetPostsType,
  };
  // return { isError: res?.isError, data: res?.data as GetPostsType };
};

export const fetchFooterBottomQuery = async () => {
  const res = await fetchApi("footer-bottom");

  return {
    ...res,
    data: res?.data?.[0] as FooterBottomType,
  };
  // return { isError: res?.isError, data: res?.data?.[0] as FooterBottomType };
};

// HomePage
export const fetchUsMissionQuery = async () => {
  const res = await fetchApi("us-mission");

  return {
    ...res,
    data: res?.data?.[0] as UsMissionType,
  };
  // return { isError: res?.isError, data: res?.data?.[0] as UsMissionType };
};

export const fetchWhyWeStartedQuery = async () => {
  const res = await fetchApi("why-we-started");

  return {
    ...res,
    data: res?.data?.[0] as WhyWeStartedType,
  };
  // return { isError: res?.isError, data: res?.data?.[0] as WhyWeStartedType };
};

export const fetchTestimonialStaticQuery = async () => {
  const res = await fetchApi("testimonial-static");

  return {
    ...res,
    data: res?.data?.[0] as TestimonialStaticType,
  };
  // return { isError: res?.isError, data: res?.data?.[0] as TestimonialStaticType };
};

// AboutUsPage
export const fetchAboutUsStaticQuery = async () => {
  const res = await fetchApi("about-us-static");

  return {
    ...res,
    data: res?.data?.[0] as AboutUsStaticType,
  };
  // return { isError: res?.isError, data: res?.data?.[0] as AboutUsStaticType };
};

export const fetchAboutUsStatisticQuery = async () => {
  const res = await fetchApi("about-us-statistic");

  return {
    ...res,
    data: res?.data as AboutUsOverviewType[],
  };

  // return { isError: res?.isError, data: res?.data as AboutUsOverviewType[] };
};

export const fetchWhyThisBlogQuery = async () => {
  const res = await fetchApi("why-this-blog");

  return {
    ...res,
    data: res?.data?.[0] as WhyThisBlogType,
  };
  // return { isError: res?.isError, data: res?.data?.[0] as WhyThisBlogType };
};

export const fetchKnowMoreQuery = async () => {
  const res = await fetchApi("know-more");

  return {
    ...res,
    data: res?.data?.[0] as KnowMoreType,
  };
  // return { isError: res?.isError, data: res?.data?.[0] as KnowMoreType };
};

// PostPage
export const fetchPostByIdQuery = async (id: number) => {
  const res = await fetchApi(`posts/${id}`);

  return {
    ...res,
    data: res?.data?.[0] as KnowMoreType,
  };
  // return { isError: res?.isError, data: res?.data as PostType };
};

// Account
// ProfilePage
export const fetchUserByIdQuery = async (id: number) => {
  const res = await fetchApi(`users/${id}`);

  return {
    ...res,
    data: res?.data as UserType,
  };
  // return { isError: res?.isError, data: res?.data as UserType };
};
