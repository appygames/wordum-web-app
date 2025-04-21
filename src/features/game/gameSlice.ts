import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Difficulty = "easy" | "medium" | "hard" | "expert";

interface GameState {
  grid: string[][];
  selectedLetter: string | null;
  difficulty: Difficulty;
  revealedWords: string[];
}

const getInitialGrid = (difficulty: Difficulty): string[][] => {
  const size = difficulty === "easy" || difficulty === "medium" ? 4 : 5;
  return Array.from({ length: size }, () => Array(size).fill(""));
};

const initialState: GameState = {
  difficulty: "easy",
  grid: getInitialGrid("easy"),
  selectedLetter: null,
  revealedWords: [], // Stores revealed words if any
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
      state.grid = getInitialGrid(action.payload);
      state.selectedLetter = null;
      state.revealedWords = [];

      // Reveal logic
      if (action.payload === "easy") {
        state.revealedWords = ["ALL"]; // pseudo indicator for full reveal
      } else if (action.payload === "hard") {
        state.revealedWords = ["WORD1"]; // reveal one word
      }
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
  },
});

export const { setDifficulty, setSelectedLetter, placeLetterInGrid } =
  gameSlice.actions;

export default gameSlice.reducer;
