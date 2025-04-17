// store.ts
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./features/game/gameSlice";
import feedbackReducer from "./features/feedback/feedbackSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    feedback: feedbackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
