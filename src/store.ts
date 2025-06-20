// store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./features/game/gameSlice";
import userReducer from "./store/userSlice";

export const store = configureStore({
  reducer: combineReducers({
    game: gameReducer,
    user: userReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
