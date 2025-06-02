import { playSound } from "@/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Difficulty = "easy" | "medium" | "hard" | "expert";

export type LetterFeedback = "green" | "yellow" | "red" | "";
export type GameStatus = "playing" | "won" | "lost";
interface GameState {
  grid: string[][];
  selectedLetter: { char: string; index: number } | null;
  difficulty: Difficulty;
  targetWords: string[];
  gameStatus: GameStatus;
  attempts: number;
  feedback: LetterFeedback[][];
  placedLettersIndex: (number | null)[][];
  disabledButtons: number[];
  keyboard: string[];
  coins: number;
}

const getInitialGrid = (difficulty: Difficulty): string[][] => {
  const size = difficulty === "easy" || difficulty === "medium" ? 4 : 5;
  return Array.from({ length: 4 }, () => Array(size).fill(""));
};
const getInitialPlacedIndexes = (difficulty: Difficulty): number[][] =>
  Array.from({ length: 4 }, () =>
    Array(difficulty === "easy" || difficulty === "medium" ? 4 : 5).fill(null)
  );
const getInitialCoins = () => Number(localStorage.getItem("coins")) || 0;
const setCoins = (difficulty: Difficulty) => {
  let coins = getInitialCoins();
  switch (difficulty) {
    case "easy":
      coins += 5;
      break;
    case "medium":
      coins += 10;
      break;
    case "hard":
      coins += 15;
      break;
    case "expert":
      coins += 20;
      break;
  }
  localStorage.setItem("coins", coins.toString());
};
const initialState: GameState = {
  difficulty: "easy",
  grid: getInitialGrid("easy"),
  selectedLetter: null,
  targetWords: [],
  gameStatus: "playing",
  attempts: 3,
  feedback: [],
  placedLettersIndex: getInitialPlacedIndexes("easy"),
  disabledButtons: [],
  keyboard: [],
  coins: getInitialCoins(),
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
      state.grid = getInitialGrid(action.payload);
      state.placedLettersIndex = getInitialPlacedIndexes(action.payload);
      state.selectedLetter = null;
    },

    setSelectedLetter: (
      state,
      action: PayloadAction<{ char: string; index: number }>
    ) => {
      state.selectedLetter = action.payload;
    },
    revealLettersInGrid: (state, action: PayloadAction<string[]>) => {
      const targetWords = action.payload;
      const rows = state.grid.length;
      const revealedLetters = new Set();

      for (let i = 0; i < rows; i++) {
        const word = targetWords[i] || "";
        if (word.length === 0) continue;

        let attempts = 0;
        let randomCol = Math.floor(Math.random() * word.length);
        let letter = word[randomCol];

        // Try to get a unique letter for each row
        while (revealedLetters.has(letter) && attempts < word.length) {
          randomCol = Math.floor(Math.random() * word.length);
          letter = word[randomCol];
          attempts++;
        }

        revealedLetters.add(letter);

        if (state.grid[i] && state.grid[i].length > randomCol) {
          state.grid[i][randomCol] = letter;

          if (!state.feedback[i]) {
            state.feedback[i] = Array(state.grid[i].length).fill("");
          }

          state.feedback[i][randomCol] = "green";

          const keyIndex = state.keyboard.indexOf(letter);
          if (keyIndex !== -1 && !state.disabledButtons.includes(keyIndex)) {
            state.disabledButtons.push(keyIndex);
          }

          state.placedLettersIndex[i][randomCol] = keyIndex;
        }
      }
    },

    setTargetWords: (state, action: PayloadAction<string[]>) => {
      if (!action.payload) return;
      state.targetWords = action.payload?.map((word) => word.toUpperCase());
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
      const { selectedLetter, rowIndex, colIndex } = action.payload;

      // Return early if invalid input or out-of-bound indices
      if (
        !selectedLetter ||
        rowIndex >= state.grid.length ||
        colIndex >= state.grid[0].length
      ) {
        return;
      }

      // Handle undoing previous letter at this position
      const prevIndex = state.placedLettersIndex[rowIndex]?.[colIndex];
      if (prevIndex !== null && prevIndex !== undefined) {
        state.disabledButtons = state.disabledButtons.filter(
          (index) => index !== prevIndex
        );
      }

      // Place the new letter
      state.grid[rowIndex][colIndex] = selectedLetter.char;
      state.placedLettersIndex[rowIndex][colIndex] = selectedLetter.index;
      state.disabledButtons.push(selectedLetter.index);

      const correctLetter = state.targetWords[rowIndex][colIndex];
      const correctWord = state.targetWords[rowIndex];

      if (selectedLetter.char === correctLetter) {
        state.feedback[rowIndex][colIndex] = "green";
      } else {
        const totalOccurrences = [...correctWord].filter(
          (char) => char === selectedLetter.char
        ).length;

        const alreadyPlacedCount = (state.feedback[rowIndex] || []).filter(
          (fb, idx) =>
            (fb === "green" || fb === "yellow") &&
            state.grid[rowIndex][idx] === selectedLetter.char
        ).length;

        if (
          correctWord.includes(selectedLetter.char) &&
          alreadyPlacedCount < totalOccurrences
        ) {
          state.feedback[rowIndex][colIndex] = "yellow";
        } else {
          state.feedback[rowIndex][colIndex] = "red";
          state.attempts -= 1;
          playSound("/sounds/error.mp3");
        }
        state.selectedLetter = null;
      }

      if (state.attempts <= 0) {
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
      const allFilled = state.grid
        .flatMap((item) => item)
        .every((cell) => cell !== "");
      if (allGreen && allFilled) {
        state.gameStatus = "won";
        setCoins(state.difficulty);
      }
    },
    removeLetterFromGrid: (state, action) => {
      const { row, col } = action.payload;

      const placedIndex = state.placedLettersIndex[row]?.[col];
      if (placedIndex !== null && placedIndex !== undefined) {
        state.disabledButtons = state.disabledButtons.filter(
          (index) => index !== placedIndex
        );
      }

      state.grid[row][col] = "";
      state.feedback[row][col] = "";

      state.placedLettersIndex[row][col] = null;
      state.selectedLetter = null;
    },

    resetFeedback: (state) => {
      state.feedback = [];
      state.attempts = 3;
      state.gameStatus = "playing";
      state.selectedLetter = null;
      state.placedLettersIndex = getInitialPlacedIndexes(state.difficulty);
      state.grid = getInitialGrid(state.difficulty);
      state.disabledButtons = [];
      state.keyboard = [];
      state.targetWords = [];
    },
  },
});

export const {
  setDifficulty,
  setSelectedLetter,
  revealLettersInGrid,
  setTargetWords,
  evaluateLetter,
  checkGameWon,
  resetFeedback,
  removeLetterFromGrid,
} = gameSlice.actions;

export default gameSlice.reducer;
