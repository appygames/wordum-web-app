import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/game",
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
