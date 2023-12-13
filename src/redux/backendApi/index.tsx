import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { UpdateUserType } from "./types";
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
    updateUser: builder.query<Record<string, string>, UpdateUserType>({
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

export const { useGetUserByIdQuery, useLazyUpdateUserQuery } = backendApi;
