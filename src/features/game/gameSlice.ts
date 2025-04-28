import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Difficulty = "easy" | "medium" | "hard" | "expert";

interface GameState {
  grid: string[][];
  selectedLetter: string | null;
  difficulty: Difficulty;
}

const getInitialGrid = (difficulty: Difficulty): string[][] => {
  const size = difficulty === "easy" || difficulty === "medium" ? 4 : 5;
  return Array.from({ length: 4 }, () => Array(size).fill(""));
};

const initialState: GameState = {
  difficulty: "easy",
  grid: getInitialGrid("easy"),
  selectedLetter: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
      state.grid = getInitialGrid(action.payload);
      state.selectedLetter = null;
    },
    setSelectedLetter: (state, action: PayloadAction<string>) => {
      state.selectedLetter = action.payload;
    },
    placeLetterInGrid: (
      state,
      action: PayloadAction<{ row: number; col: number }>
    ) => {
      const { row, col } = action.payload;
      if (
        row < state.grid.length &&
        col < state.grid[0].length &&
        !state.grid[row][col] &&
        state.selectedLetter
      ) {
        state.grid[row][col] = state.selectedLetter;
        state.selectedLetter = null;
      }
    },
    revealLettersInGrid: (state, action: PayloadAction<string[]>) => {
      const targetWords = action.payload;
      const rows = state.grid.length;

      for (let i = 0; i < rows; i++) {
        const word = targetWords[i] || "";
        if (word.length === 0) continue;

        const randomCol = Math.floor(Math.random() * word.length);
        const letter = word[randomCol];

        if (state.grid[i] && state.grid[i].length > randomCol) {
          state.grid[i][randomCol] = letter;
        }
      }
    },
  },
});

export const {
  setDifficulty,
  setSelectedLetter,
  placeLetterInGrid,
  revealLettersInGrid,
} = gameSlice.actions;

export default gameSlice.reducer;
