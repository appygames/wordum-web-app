import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LetterFeedback = "green" | "yellow" | "red";

interface FeedbackState {
  targetWords: string[]; // updated from targetWord to targetWords
  feedback: LetterFeedback[][]; // 2D feedback array (row -> feedback per letter)
}

const initialState: FeedbackState = {
  targetWords: ["APPLE", "GRAPE", "MANGO", "BERRY"], // or empty initially
  feedback: [],
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setTargetWords: (state, action: PayloadAction<string[]>) => {
      state.targetWords = action.payload.map((word) => word.toUpperCase());
      state.feedback = [];
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
    },

    resetFeedback: (state) => {
      state.feedback = [];
    },
  },
});

export const { setTargetWords, evaluateGuess, resetFeedback } =
  feedbackSlice.actions;
export default feedbackSlice.reducer;
