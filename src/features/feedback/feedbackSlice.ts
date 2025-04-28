import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LetterFeedback = "green" | "yellow" | "red" | "";
export type GameStatus = "playing" | "won" | "lost";

interface FeedbackState {
  targetWords: string[];
  gameStatus: GameStatus;
  attempts: number;
  feedback: LetterFeedback[][];
  keyboard: string[];
}

const initialState: FeedbackState = {
  targetWords: [],
  gameStatus: "playing",
  attempts: 3,
  feedback: [],
  keyboard: [],
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
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
      }
    },

    resetFeedback: (state) => {
      state.feedback = [];
      state.gameStatus = "playing";
      state.attempts = 3;
    },
  },
});

export const { setTargetWords, evaluateLetter, checkGameWon, resetFeedback } =
  feedbackSlice.actions;
export default feedbackSlice.reducer;
