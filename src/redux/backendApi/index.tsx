import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  GetContactUsMessagesType,
  GetContactUsQueriesType,
  GetFeaturedInType,
  GetPostsType,
  GetTagsType,
  GetTestimonialsType,
  GetUsersType,
  ResetPasswordType,
  UpdateBrandType,
  UpdatePostType,
  UpdateQueryType,
  UpdateTestimonialType,
  UpdateUserType,
} from "./types";

import { getSession } from "next-auth/react";

import { BACKEND_URL } from "../../utils/constants";

export const backendApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.backendTokens?.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Posts", "Brands", "Testimonials", "Queries"],
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
    getFeaturedIn: builder.query<GetFeaturedInType, string>({
      query: (request) => `featured-in${request}`,
      providesTags: ["Brands"],
    }),
    getTestimonial: builder.query<GetTestimonialsType, string>({
      query: (request) => `testimonial${request}`,
      providesTags: ["Testimonials"],
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
    getContactUsQueries: builder.query<GetContactUsQueriesType, string>({
      query: (request) => `contact-us-queries${request}`,
      providesTags: ["Queries"],
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
    getBrandById: builder.query<FeaturedCompanyType, number>({
      query: (id) => `featured-in/${id}`,
    }),
    getTestimonialById: builder.query<TestimonialType, number>({
      query: (id) => `testimonial/${id}`,
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
    createBrand: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: "featured-in",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Brands"],
    }),
    createTestimonial: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: "testimonial",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Testimonials"],
    }),
    createQuery: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: "contact-us-queries",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Queries"],
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
    updateBrand: builder.mutation<any, UpdateBrandType>({
      query: ({ id, body }) => {
        return {
          url: `featured-in/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["Brands"],
    }),
    updateTestimonial: builder.mutation<any, UpdateTestimonialType>({
      query: ({ id, body }) => {
        return {
          url: `testimonial/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["Testimonials"],
    }),
    updateQuery: builder.mutation<any, UpdateQueryType>({
      query: ({ id, body }) => {
        return {
          url: `contact-us-queries/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["Queries"],
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
    deleteBrand: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `featured-in/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Brands"],
    }),
    deleteTestimonial: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `testimonial/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Testimonials"],
    }),
    deleteQuery: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `contact-us-queries/${id}`,
          method: "DELETE",
        };
      },
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
  useGetBrandByIdQuery,
  useGetTestimonialByIdQuery,

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
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
  useCreateTestimonialMutation,
  useDeleteTestimonialMutation,
  useUpdateTestimonialMutation,
  useCreateQueryMutation,
  useUpdateQueryMutation,
  useDeleteQueryMutation,
} = backendApi;

// export const testApi = createApi({
//   reducerPath: "megamenuApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://json-server-vercel-test-eight.vercel.app/",
//   }),
//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       query: () => "products",
//     }),
//   }),
// });

// import type { RootState } from "../store";
// prepareHeaders: async (headers, { getState }) => {
// let token = (getState() as RootState).auth.token;
