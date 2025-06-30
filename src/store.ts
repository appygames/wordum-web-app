// store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./features/game/gameSlice";
import userReducer from "./store/userSlice";
import { userApi } from "./store/slices/userApiSlice";
import { gameApi } from "./store/slices/gameApiSlice";

export const store = configureStore({
  reducer: combineReducers({
    game: gameReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [gameApi.reducerPath]: gameApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, gameApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
