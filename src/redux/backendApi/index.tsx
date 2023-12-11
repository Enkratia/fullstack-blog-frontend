import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    getUserById: builder.query<UserType, number>({
      query: (id) => `users/${id}`,
    }),

    // **
    // postRegister: builder.query<string, void>({
    //   query: (userData) => {
    //     return {
    //       url: "/register",
    //       method: "POST",
    //       body: userData,
    //     };
    //   },
    // }),
  }),
});

export const { useGetUserByIdQuery, useLazyGetUserByIdQuery } = backendApi;
