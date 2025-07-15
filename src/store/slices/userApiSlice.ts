import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.wordum.app/api/user",
    prepareHeaders: (headers) => {
      headers.set("X-Api-key", "appykan-wordum-1234");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (body) => ({
        url: "create",
        method: "POST",
        body,
      }),
    }),
    getUserByDeviceId: builder.query({
      query: (device_id: string) => `${device_id}`,
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: "update",
        method: "PUT",
        body,
      }),
    }),
    sendHint: builder.mutation({
      query: (body) => ({
        url: "hint",
        method: "POST",
        body,
      }),
    }),
    sendGameResult: builder.mutation({
      query: (body) => ({
        url: "game-result",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserByDeviceIdQuery,
  useUpdateUserMutation,
  useSendHintMutation,
  useSendGameResultMutation,
  useLazyGetUserByDeviceIdQuery,
} = userApi;
