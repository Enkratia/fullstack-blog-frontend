import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  ActivateUserType,
  GetPostsType,
  GetTagsType,
  GetUsersType,
  UnsubscribeType,
  UpdateUserType,
} from "./types";
import type { RootState } from "../store";

import { BACKEND_URL } from "../../utils/constants";

export const backendApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // GET
    getUserById: builder.query<UserType, string>({
      query: (id) => `users/${id}`,
    }),
    getUsers: builder.query<GetUsersType, string>({
      query: (request) => `users/${request}`,
    }),
    getPostById: builder.query<PostType, string>({
      query: (id) => `posts/${id}`,
    }),
    getPosts: builder.query<GetPostsType, string>({
      query: (request) => `posts/${request}`,
    }),
    getTags: builder.query<GetTagsType, string>({
      query: (request) => `posts/tags${request}`,
    }),
    getFeaturedIn: builder.query<FeaturedCompanyType[], void>({
      query: () => "featured-in",
    }),
    getTestimonial: builder.query<TestimonialType[], void>({
      query: () => "testimonial",
    }),
    getAboutUsStatic: builder.query<AboutUsStaticType, void>({
      query: () => "about-us-static",
    }),
    getCategoryHeader: builder.query<CategoryHeaderType[], void>({
      query: () => "category-header",
    }),
    getContactUs: builder.query<ContactUsType[], void>({
      query: () => "contact-us",
    }),
    getContactUsQueries: builder.query<ContactUsQueryType, void>({
      query: () => "contact-us-queries",
    }),

    // CREATE
    createUser: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: "auth/register",
          method: "POST",
          body: body,
        };
      },
    }),
    createPost: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: "posts",
          method: "POST",
          body: body,
        };
      },
    }),
    createSubscribe: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: "subscribe",
          method: "POST",
          body: body,
        };
      },
    }),
    createContactUsMessage: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: "contact-us-messages",
          method: "POST",
          body: body,
        };
      },
    }),

    // **
    activateUser: builder.query<any, ActivateUserType>({
      query: (body) => {
        return {
          url: "auth/activate",
          method: "PATCH",
          body: body,
        };
      },
    }),
    unsubscribe: builder.query<any, UnsubscribeType>({
      query: (body) => {
        return {
          url: "subscribe",
          method: "DELETE",
          body: body,
        };
      },
    }),

    // UPDATE
    updateUser: builder.mutation<any, UpdateUserType>({
      query: ({ id, body }) => {
        return {
          url: `users/${id}`,
          method: "PATCH",
          body: body,
        };
      },
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetPostByIdQuery,
  useGetPostsQuery,
  useGetUsersQuery,
  useGetTagsQuery,
  useGetFeaturedInQuery,
  useGetTestimonialQuery,
  useGetAboutUsStaticQuery,
  useGetCategoryHeaderQuery,
  useGetContactUsQuery,
  useGetContactUsQueriesQuery,
  useActivateUserQuery,
  useUnsubscribeQuery,

  // **
  useCreateUserMutation,
  useCreatePostMutation,
  useUpdateUserMutation,
  useCreateSubscribeMutation,
  useCreateContactUsMessageMutation,
} = backendApi;
