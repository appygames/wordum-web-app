import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  avatar: string | null;
  coins: number;
  stats: {
    easy: string;
    medium: string;
    hard: string;
    expert: string;
  };
}

const initialState: UserState = {
  avatar: null,
  coins: 289,
  stats: {
    easy: '35 / 60',
    medium: '20 / 60',
    hard: '10 / 60',
    expert: '10 / 10',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAvatar(state, action: PayloadAction<string>) {
      state.avatar = action.payload;
    },
  },
});

export const { setAvatar } = userSlice.actions;
export default userSlice.reducer;
