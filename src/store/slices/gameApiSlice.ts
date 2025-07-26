import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Word {
  text: string;
}

interface CreateGameRequest {
  device_id: string;
  words: Word[];
  reveal_letters: boolean;
}

interface CreateGameResponse {
  data: {
    code: string;
    game_id: string;
    share_link: string;
  };
}

interface GameResponse {
  data: {
    code: string;
    created_at: string;
    creator: string;
    expires_at: string;
    game_id: string;
    losses: number;
    reveal_letters: boolean;
    wins: number;
    words: Word[];
  };
}

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
    createGame: builder.mutation<CreateGameResponse, CreateGameRequest>({
      query: (body) => ({
        url: "create",
        method: "POST",
        body,
      }),
    }),
    getGameById: builder.query<GameResponse, string>({
      query: (id) => `/${id}`,
      // Keep the data in cache for 5 minutes
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useCreateGameMutation,
  useGetGameByIdQuery,
  useLazyGetGameByIdQuery,
} = gameApi;
