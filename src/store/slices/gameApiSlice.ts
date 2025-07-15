import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.wordum.app/api/game",
    prepareHeaders: (headers) => {
      headers.set("X-Api-key", "appykan-wordum-1234");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createGame: builder.mutation<
      { gameCode: string },
      {
        targetWords: string[];
        coins: number;
        length: number;
        level: string;
      }
    >({
      query: (body) => ({
        url: "create",
        method: "POST",
        body,
      }),
    }),
    getGameById: builder.query<
      {
        id: string;
        targetWords: string[];
        level: "easy" | "medium" | "hard";
        coins: number;
        length: number;
      },
      string
    >({
      query: (id) => `/${id}`,
    }),
  }),
});

export const {
  useCreateGameMutation,
  useGetGameByIdQuery,
  useLazyGetGameByIdQuery,
} = gameApi;
