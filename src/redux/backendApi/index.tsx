import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  GetContactUsMessagesType,
  GetPostsType,
  GetTagsType,
  GetUsersType,
  ResetPasswordType,
  UpdatePostType,
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
  tagTypes: ["Posts"],
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
      providesTags: ["Posts"],
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
    getAboutUsStatic: builder.query<AboutUsStaticType[], void>({
      query: () => "about-us-static",
    }),
    getCategoryHeader: builder.query<CategoryHeaderType, void>({
      query: () => "category-header",
    }),
    getContactUs: builder.query<ContactUsType[], void>({
      query: () => "contact-us",
    }),
    getContactUsQueries: builder.query<ContactUsQueriesType, void>({
      query: () => "contact-us-queries",
    }),
    getPrivacyPolicy: builder.query<PrivacyPolicyType, void>({
      query: () => "privacy-policy",
    }),
    getAboutUsStatistic: builder.query<AboutUsOverviewType[], void>({
      query: () => "about-us-statistic",
    }),
    getSubscribersCount: builder.query<SubscribersCountType, void>({
      query: () => "subscribe/count",
    }),
    getContactUsMessages: builder.query<GetContactUsMessagesType, string>({
      query: (request) => `contact-us-messages${request}`,
    }),
    getContactUsMessageById: builder.query<ContactUsMessageType, string>({
      query: (id) => `contact-us-messages/${id}`,
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
    checkUserEmail: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: "auth/forgot",
          method: "POST",
          body: body,
        };
      },
    }),

    // **
    verifyReset: builder.query<any, string>({
      query: (token) => {
        return {
          url: `auth/verify-reset?token=${token}`,
          method: "POST",
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
    updatePost: builder.mutation<any, UpdatePostType>({
      query: ({ id, body }) => {
        return {
          url: `posts/${id}`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updateAboutUsStatic: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: `about-us-static`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updateKnowMoreStatic: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: `know-more`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updateWhyThisBlogStatic: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: `why-this-blog`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updateUsMissionStatic: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: `us-mission`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updateCategoryDescriptionStatic: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: `category-description`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updateWhyWeStartedStatic: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: `why-we-started`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updateTestimonialStatic: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: `testimonial-static`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updateJoin: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: `join`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updateCategoryHeader: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: `category-header`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updateContactUs: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: `contact-us`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updateFooterBottom: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: `footer-bottom`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updatePrivacyPolicy: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: `privacy-policy`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updateContactUsMessages: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `contact-us-messages/${id}`,
          method: "PATCH",
        };
      },
    }),

    // **
    resetPassword: builder.mutation<any, ResetPasswordType>({
      query: ({ token, body }) => {
        return {
          url: `auth/reset?token=${token}`,
          method: "PATCH",
          body: body,
        };
      },
    }),
    updateFeaturedPost: builder.mutation<any, string>({
      query: (id) => {
        return {
          url: `posts/featured?id=${id}`,
          method: "PATCH",
        };
      },
    }),
    activateUser: builder.query<any, string>({
      query: (token) => {
        return {
          url: `auth/activate?token=${token}`,
          method: "PATCH",
        };
      },
    }),

    // DELETE
    deletePost: builder.mutation<any, string>({
      query: (id) => {
        return {
          url: `posts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Posts"],
    }),

    // **
    unsubscribe: builder.query<any, string>({
      query: (token) => {
        return {
          url: `subscribe?token=${token}`,
          method: "DELETE",
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
  useVerifyResetQuery,
  useGetPrivacyPolicyQuery,
  useGetAboutUsStatisticQuery,
  useGetSubscribersCountQuery,
  useGetContactUsMessagesQuery,
  useGetContactUsMessageByIdQuery,

  // **
  useCreateUserMutation,
  useCreatePostMutation,
  useUpdateUserMutation,
  useCreateSubscribeMutation,
  useCreateContactUsMessageMutation,
  useCheckUserEmailMutation,
  useResetPasswordMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useUpdateAboutUsStaticMutation,
  useUpdateKnowMoreStaticMutation,
  useUpdateWhyThisBlogStaticMutation,
  useUpdateUsMissionStaticMutation,
  useUpdateCategoryDescriptionStaticMutation,
  useUpdateWhyWeStartedStaticMutation,
  useUpdateTestimonialStaticMutation,
  useUpdateJoinMutation,
  useUpdateCategoryHeaderMutation,
  useUpdateContactUsMutation,
  useUpdateFooterBottomMutation,
  useUpdatePrivacyPolicyMutation,
  useUpdateContactUsMessagesMutation,
  useUpdateFeaturedPostMutation,
} = backendApi;
