"use server";

import type { GetPostsType } from "../redux/backendApi/types";
import type { TagTypesType } from "../redux/backendApi";

import { BACKEND_URL } from "../utils/constants";

const fetchApi = async (query: string, tags?: TagTypesType[]) => {
  const args = `${BACKEND_URL}/${query}`;

  try {
    const response = await fetch(args, {
      next: {
        tags,
        revalidate: 60,
      },
    });

    if (!response.ok) {
      return {
        isError: true,
        args,
      };
    }

    const data = await response.json();

    return {
      isError: false,
      data,
      args,
    };
  } catch (error) {
    return {
      isError: true,
      args,
    };
  }
};

// Common
export const fetchCategoryDescriptionQuery = async () => {
  const res = await fetchApi("category-description");

  return {
    ...res,
    data: res?.data?.[0] as CategoryDescriptionType,
  };
};

export const fetchJoinQuery = async () => {
  const res = await fetchApi("join");

  return {
    ...res,
    data: res?.data?.[0] as JoinType,
  };
};

export const fetchPostsQuery = async (request: string) => {
  const res = await fetchApi(`posts${request}`, ["Posts"]);

  return {
    ...res,
    data: res?.data as GetPostsType,
  };
};

export const fetchFooterBottomQuery = async () => {
  const res = await fetchApi("footer-bottom");

  return {
    ...res,
    data: res?.data?.[0] as FooterBottomType,
  };
};

// HomePage
export const fetchUsMissionQuery = async () => {
  const res = await fetchApi("us-mission");

  return {
    ...res,
    data: res?.data?.[0] as UsMissionType,
  };
};

export const fetchWhyWeStartedQuery = async () => {
  const res = await fetchApi("why-we-started");

  return {
    ...res,
    data: res?.data?.[0] as WhyWeStartedType,
  };
};

export const fetchTestimonialStaticQuery = async () => {
  const res = await fetchApi("testimonial-static");

  return {
    ...res,
    data: res?.data?.[0] as TestimonialStaticType,
  };
};

// AboutUsPage
export const fetchAboutUsStaticQuery = async () => {
  const res = await fetchApi("about-us-static");

  return {
    ...res,
    data: res?.data?.[0] as AboutUsStaticType,
  };
};

export const fetchAboutUsStatisticQuery = async () => {
  const res = await fetchApi("about-us-statistic");

  return {
    ...res,
    data: res?.data as AboutUsOverviewType[],
  };
};

export const fetchWhyThisBlogQuery = async () => {
  const res = await fetchApi("why-this-blog");

  return {
    ...res,
    data: res?.data?.[0] as WhyThisBlogType,
  };
};

export const fetchKnowMoreQuery = async () => {
  const res = await fetchApi("know-more");

  return {
    ...res,
    data: res?.data?.[0] as KnowMoreType,
  };
};

// PostPage
export const fetchPostByIdQuery = async (id: string) => {
  const res = await fetchApi(`posts/${id}`, ["Posts"]);

  return {
    ...res,
    data: res?.data as PostType,
  };
};

// AuthorPage
export const fetchUserByIdQuery = async (id: string) => {
  const res = await fetchApi(`users/${id}`);

  return {
    ...res,
    data: res?.data as UserType,
  };
};

// ContactUsPage
export const fetchContactUsQuery = async () => {
  const res = await fetchApi(`contact-us`);

  return {
    ...res,
    data: res?.data?.[0] as ContactUsType,
  };
};

export const fetchContactUsQueriesQuery = async (request: string) => {
  const res = await fetchApi(`contact-us-queries${request}`);

  return {
    ...res,
    data: res?.data as ContactUsQueriesType,
  };
};
