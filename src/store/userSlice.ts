import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Stats {
  easy: { wins: number; losses: number };
  medium: { wins: number; losses: number };
  hard: { wins: number; losses: number };
  expert: { wins: number; losses: number };
}

interface UserState {
  avatar: string | null;
  stats: Stats;
}

const initialState: UserState = {
  avatar: null,
  stats: {
    easy: { wins: 0, losses: 0 },
    medium: { wins: 0, losses: 0 },
    hard: { wins: 0, losses: 0 },
    expert: { wins: 0, losses: 0 },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAvatar(state, action: PayloadAction<string>) {
      state.avatar = action.payload;
    },
    setStats(state, action: PayloadAction<Stats>) {
      state.stats = action.payload;
    },
  },
});

export const { setAvatar, setStats } = userSlice.actions;
export default userSlice.reducer;
