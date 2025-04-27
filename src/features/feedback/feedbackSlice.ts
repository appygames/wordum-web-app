import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LetterFeedback = "green" | "yellow" | "red" | "";
export type GameStatus = "playing" | "won" | "lost";
interface FeedbackState {
  targetWords: string[];
  gameStatus: GameStatus;
  correctGuesses: number;
  feedback: LetterFeedback[][];
  keyboard: string[];
}

const initialState: FeedbackState = {
  targetWords: [],
  gameStatus: "playing",
  correctGuesses: 0,
  feedback: [],
  keyboard: [],
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setTargetWords: (state, action: PayloadAction<string[]>) => {
      state.targetWords = action.payload.map((word) => word.toUpperCase());
      state.feedback = Array(action.payload.length).fill([]);

      const allChars = action.payload.flatMap((word) => word.split(""));

      for (let i = allChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allChars[i], allChars[j]] = [allChars[j], allChars[i]];
      }

      state.keyboard = allChars;
    },

    evaluateGuess: (
      state,
      action: PayloadAction<{ guess: string; rowIndex: number }>
    ) => {
      const { guess, rowIndex } = action.payload;
      const upperGuess = guess.toUpperCase().split("");
      const target = state.targetWords[rowIndex]?.split("") ?? [];
      const feedbackRow: LetterFeedback[] = Array(upperGuess.length).fill(
        "red"
      );
      const usedIndices = new Set<number>();

      // First pass: green
      for (let i = 0; i < upperGuess.length; i++) {
        if (upperGuess[i] === target[i]) {
          feedbackRow[i] = "green";
          usedIndices.add(i);
        }
      }

      // Second pass: yellow
      for (let i = 0; i < upperGuess.length; i++) {
        if (feedbackRow[i] === "green") continue;

        for (let j = 0; j < target.length; j++) {
          if (!usedIndices.has(j) && upperGuess[i] === target[j]) {
            feedbackRow[i] = "yellow";
            usedIndices.add(j);
            break;
          }
        }
      }

      state.feedback[rowIndex] = feedbackRow;
      // ✅ Check if current guess is correct
      const isCorrect = feedbackRow.every((f) => f === "green");

      if (isCorrect) {
        // User got the word right
        state.correctGuesses = (state.correctGuesses || 0) + 1;
      }

      // ✅ Win condition: all words guessed correctly
      if ((state.correctGuesses || 0) === state.targetWords.length) {
        state.gameStatus = "won";
        return;
      }
    },
    evaluateLetter: (state, action) => {
      const { letter, rowIndex, colIndex } = action.payload;

      const correctLetter = state.targetWords[rowIndex][colIndex];
      const correctRow = state.targetWords[rowIndex];

      if (letter === correctLetter) {
        state.feedback[rowIndex][colIndex] = "green"; // green
      } else if (correctRow.includes(letter)) {
        state.feedback[rowIndex][colIndex] = "yellow"; // yellow
      } else {
        state.feedback[rowIndex][colIndex] = "red"; // red
      }
    },

    resetFeedback: (state) => {
      state.feedback = [];
      state.gameStatus = "playing";
      state.correctGuesses = 0;
    },
  },
});

export const { setTargetWords, evaluateGuess, evaluateLetter, resetFeedback } =
  feedbackSlice.actions;
export default feedbackSlice.reducer;
