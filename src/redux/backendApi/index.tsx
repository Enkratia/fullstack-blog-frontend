import { getSession } from "next-auth/react";
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

import { BACKEND_URL } from "../../utils/constants";
import { revalidateTagsAction } from "../../utils/actions";

// **
const invalidateFetchTags = async (tags: TagTypesType[]) => {
  try {
    await revalidateTagsAction(tags);
  } catch {
    console.warn(`Failed to revalidate tag: ${tags}`);
  }
};

const tagTypes = [
  "Users",
  "Posts",
  "Brands",
  "Testimonials",
  "ContactUsQueries",

  // **
  "PrivacyPolicy",
  "CategoryHeader",
  "AboutUsStatic",
  "CategoryDescription",
  "Join",
  "UsMission",
  "WhyWeStarted",
  "TestimonialStatic",
  "WhyThisBlog",
  "KnowMore",

  // **
  "ContactUs",
  "FooterBottom",

  // **
  "Messages",
] as const;
export type TagTypesType = (typeof tagTypes)[number];

// **
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
  keepUnusedDataFor: 600,
  tagTypes,
  endpoints: (builder) => ({
    // GET
    getUserById: builder.query<UserType, string>({
      query: (id) => `users/${id}`,
      providesTags: ["Users"],
    }),
    getUsers: builder.query<GetUsersType, string>({
      query: (request) => `users/${request}`,
      providesTags: ["Users"],
    }),
    getPostById: builder.query<PostType, string>({
      query: (id) => `posts/${id}`,
      providesTags: ["Posts"],
    }),
    getPosts: builder.query<GetPostsType, string>({
      query: (request) => `posts/${request}`,
      providesTags: ["Posts"],
    }),
    getTags: builder.query<GetTagsType, string>({
      query: (request) => `posts/tags${request}`,
      providesTags: ["Posts"],
    }),
    getFeaturedIn: builder.query<GetFeaturedInType, string>({
      query: (request) => `featured-in${request}`,
      providesTags: ["Brands"],
    }),
    getTestimonial: builder.query<GetTestimonialsType, string>({
      query: (request) => `testimonial${request}`,
      providesTags: ["Testimonials"],
    }),
    getContactUsQueries: builder.query<GetContactUsQueriesType, string>({
      query: (request) => `contact-us-queries${request}`,
      providesTags: ["ContactUsQueries"],
    }),
    getBrandById: builder.query<FeaturedCompanyType, number>({
      query: (id) => `featured-in/${id}`,
      providesTags: ["Brands"],
    }),
    getTestimonialById: builder.query<TestimonialType, number>({
      query: (id) => `testimonial/${id}`,
      providesTags: ["Testimonials"],
    }),

    // **
    getAboutUsStatic: builder.query<AboutUsStaticType[], void>({
      query: () => "about-us-static",
      providesTags: ["AboutUsStatic"],
    }),
    getCategoryHeader: builder.query<CategoryHeaderType, void>({
      query: () => "category-header",
      providesTags: ["CategoryHeader"],
    }),
    getPrivacyPolicy: builder.query<PrivacyPolicyType, void>({
      query: () => "privacy-policy",
      providesTags: ["PrivacyPolicy"],
    }),
    getContactUs: builder.query<ContactUsType[], void>({
      query: () => "contact-us",
      providesTags: ["ContactUs"],
    }),

    // **
    getContactUsMessages: builder.query<GetContactUsMessagesType, string>({
      query: (request) => `contact-us-messages${request}`,
      providesTags: ["Messages"],
    }),
    getContactUsMessageById: builder.query<ContactUsMessageType, string>({
      query: (id) => `contact-us-messages/${id}`,
      providesTags: ["Messages"],
    }),

    // **
    getAboutUsStatistic: builder.query<AboutUsOverviewType[], void>({
      query: () => "about-us-statistic",
      keepUnusedDataFor: 60,
    }),
    getSubscribersCount: builder.query<SubscribersCountType, void>({
      query: () => "subscribe/count",
      keepUnusedDataFor: 60,
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
      invalidatesTags: ["Users", "Posts"],
      async onQueryStarted() {
        await invalidateFetchTags(["Users", "Posts"]);
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
      invalidatesTags: ["Users", "Posts"],
      async onQueryStarted() {
        await invalidateFetchTags(["Users", "Posts"]);
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
      invalidatesTags: ["Messages"],
      async onQueryStarted() {
        await invalidateFetchTags(["Messages"]);
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
      async onQueryStarted() {
        await invalidateFetchTags(["Brands"]);
      },
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
      async onQueryStarted() {
        await invalidateFetchTags(["Testimonials"]);
      },
    }),
    createQuery: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: "contact-us-queries",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["ContactUsQueries"],
      async onQueryStarted() {
        await invalidateFetchTags(["ContactUsQueries"]);
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
      invalidatesTags: ["Users", "Posts"],
      async onQueryStarted() {
        await invalidateFetchTags(["Users", "Posts"]);
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
      invalidatesTags: ["Users", "Posts"],
      async onQueryStarted() {
        await invalidateFetchTags(["Users", "Posts"]);
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
      invalidatesTags: ["AboutUsStatic"],
      async onQueryStarted() {
        await invalidateFetchTags(["AboutUsStatic"]);
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
      invalidatesTags: ["KnowMore"],
      async onQueryStarted() {
        await invalidateFetchTags(["KnowMore"]);
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
      invalidatesTags: ["WhyThisBlog"],
      async onQueryStarted() {
        await invalidateFetchTags(["WhyThisBlog"]);
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
      invalidatesTags: ["UsMission"],
      async onQueryStarted() {
        await invalidateFetchTags(["UsMission"]);
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
      invalidatesTags: ["CategoryDescription"],
      async onQueryStarted() {
        await invalidateFetchTags(["CategoryDescription"]);
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
      invalidatesTags: ["WhyWeStarted"],
      async onQueryStarted() {
        await invalidateFetchTags(["WhyWeStarted"]);
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
      invalidatesTags: ["TestimonialStatic"],
      async onQueryStarted() {
        await invalidateFetchTags(["TestimonialStatic"]);
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
      invalidatesTags: ["Join"],
      async onQueryStarted() {
        await invalidateFetchTags(["Join"]);
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
      invalidatesTags: ["CategoryHeader"],
      async onQueryStarted() {
        await invalidateFetchTags(["CategoryHeader"]);
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
      invalidatesTags: ["FooterBottom", "ContactUs"],
      async onQueryStarted() {
        await invalidateFetchTags(["FooterBottom", "ContactUs"]);
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
      invalidatesTags: ["FooterBottom", "ContactUs"],
      async onQueryStarted() {
        await invalidateFetchTags(["FooterBottom", "ContactUs"]);
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
      invalidatesTags: ["PrivacyPolicy"],
      async onQueryStarted() {
        await invalidateFetchTags(["PrivacyPolicy"]);
      },
    }),
    updateContactUsMessages: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `contact-us-messages/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Messages"],
      async onQueryStarted() {
        await invalidateFetchTags(["Messages"]);
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
      async onQueryStarted() {
        await invalidateFetchTags(["Brands"]);
      },
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
      async onQueryStarted() {
        await invalidateFetchTags(["Testimonials"]);
      },
    }),
    updateQuery: builder.mutation<any, UpdateQueryType>({
      query: ({ id, body }) => {
        return {
          url: `contact-us-queries/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["ContactUsQueries"],
      async onQueryStarted() {
        await invalidateFetchTags(["ContactUsQueries"]);
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
      invalidatesTags: ["Posts"],
      async onQueryStarted() {
        await invalidateFetchTags(["Posts"]);
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
      async onQueryStarted() {
        await invalidateFetchTags(["Posts"]);
      },
    }),
    deleteBrand: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `featured-in/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Brands"],
      async onQueryStarted() {
        await invalidateFetchTags(["Brands"]);
      },
    }),
    deleteTestimonial: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `testimonial/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Testimonials"],
      async onQueryStarted() {
        await invalidateFetchTags(["Testimonials"]);
      },
    }),
    deleteQuery: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `contact-us-queries/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ContactUsQueries"],
      async onQueryStarted() {
        await invalidateFetchTags(["ContactUsQueries"]);
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
