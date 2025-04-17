import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  grid: string[][];
  selectedLetter: string | null;
}

const initialState: GameState = {
  grid: Array.from({ length: 4 }, () => Array(5).fill("")),
  selectedLetter: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSelectedLetter: (state, action: PayloadAction<string>) => {
      state.selectedLetter = action.payload;
    },
    placeLetterInGrid: (state, action: PayloadAction<{row: number; col: number}>) =>{
      const {row, col} = action.payload;
      if (!state.grid[row][col] && state.selectedLetter) {
        state.grid[row][col] = state.selectedLetter;
        state.selectedLetter = null;
      }
    },
  },
});

export const { setSelectedLetter, placeLetterInGrid } = gameSlice.actions;
export default gameSlice.reducer;
