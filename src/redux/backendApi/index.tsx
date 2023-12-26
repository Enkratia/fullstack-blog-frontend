import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetPostsType, UpdateUserType } from "./types";
import { RootState } from "../store";

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
    getUserById: builder.query<UserType, number>({
      query: (id) => `users/${id}`,
    }),
    getPostById: builder.query<PostType, number>({
      query: (id) => `posts/${id}`,
    }),
    getPosts: builder.query<GetPostsType, string>({
      query: (request) => `posts/${request}`,
    }),

    // CREATE
    createPost: builder.query<any, FormData>({
      query: (body) => {
        return {
          url: "posts",
          method: "POST",
          body: body,
        };
      },
    }),

    // UPDATE
    updateUser: builder.query<any, UpdateUserType>({
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
  useLazyUpdateUserQuery,
  useLazyCreatePostQuery,
  useGetPostByIdQuery,
  useGetPostsQuery,
} = backendApi;
