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

interface Game {
  id: string;
  targetWords: string[];
  reveal_letters: boolean;
  device_id: string;
  length: number;
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
    getGameById: builder.query<Game, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const {
  useCreateGameMutation,
  useGetGameByIdQuery,
  useLazyGetGameByIdQuery,
} = gameApi;
