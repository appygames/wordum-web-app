import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Difficulty = "easy" | "medium" | "hard" | "expert";

export type LetterFeedback = "green" | "yellow" | "red" | "";
export type GameStatus = "playing" | "won" | "lost";
interface GameState {
  grid: string[][];
  selectedLetter: string | null;
  difficulty: Difficulty;
  targetWords: string[];
  gameStatus: GameStatus;
  attempts: number;
  feedback: LetterFeedback[][];
  keyboard: string[];
  coins: number;
}

const getInitialGrid = (difficulty: Difficulty): string[][] => {
  const size = difficulty === "easy" || difficulty === "medium" ? 4 : 5;
  return Array.from({ length: 4 }, () => Array(size).fill(""));
};

const initialState: GameState = {
  difficulty: "easy",
  grid: getInitialGrid("easy"),
  selectedLetter: null,
  targetWords: [],
  gameStatus: "playing",
  attempts: 3,
  feedback: [],
  keyboard: [],
  coins: 0,
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
          state.feedback[i][randomCol] = "green";
        }
      }
    },
    setTargetWords: (state, action: PayloadAction<string[]>) => {
      state.targetWords = action.payload.map((word) => word.toUpperCase());
      state.feedback = Array(action.payload.length)
        .fill(null)
        .map(() => []);

      const allChars = action.payload.flatMap((word) => word.split(""));
      for (let i = allChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allChars[i], allChars[j]] = [allChars[j], allChars[i]];
      }
      state.keyboard = allChars;
    },

    evaluateLetter: (state, action) => {
      const { letter, rowIndex, colIndex } = action.payload;
      const correctLetter = state.targetWords[rowIndex][colIndex];
      const correctRow = state.targetWords[rowIndex];

      if (letter === correctLetter) {
        state.feedback[rowIndex][colIndex] = "green";
      } else if (correctRow.includes(letter)) {
        state.feedback[rowIndex][colIndex] = "yellow";
        state.attempts -= 1;
      } else {
        state.feedback[rowIndex][colIndex] = "red";
        state.attempts -= 1;
      }

      if (state.attempts === 0) {
        state.gameStatus = "lost";
      }
    },

    checkGameWon: (state) => {
      const allGreen = state.feedback.every((row, rowIndex) => {
        return (
          row.length === state.targetWords[rowIndex].length &&
          row.every((cell) => cell === "green")
        );
      });

      if (allGreen) {
        state.gameStatus = "won";
        state.coins += 10;
      }
    },

    resetFeedback: (state) => {
      state.feedback = [];
      state.gameStatus = "playing";
      state.attempts = 3;
    },
  },
});

export const {
  setDifficulty,
  setSelectedLetter,
  placeLetterInGrid,
  revealLettersInGrid,
  setTargetWords,
  evaluateLetter,
  checkGameWon,
  resetFeedback,
} = gameSlice.actions;

export default gameSlice.reducer;
