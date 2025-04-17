import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LetterFeedback = "green" | "yellow" | "gray";

interface FeedbackState {
  targetWord: string;
  feedback: LetterFeedback[][];
}

const initialState: FeedbackState = {
  targetWord: "APPLE",
  feedback: [],
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setTargetWord: (state, action: PayloadAction<string>) => {
      state.targetWord = action.payload.toUpperCase();
      state.feedback = []; // Reset feedback when new word is set
    },
    evaluateGuess: (state, action: PayloadAction<string>) => {
      const guess = action.payload.toUpperCase().split("");
      const target = state.targetWord.split("");
      const feedbackRow: LetterFeedback[] = Array(guess.length).fill("gray");
      const usedIndices = new Set<number>();

      // First pass - check green (correct letter, correct position)
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === target[i]) {
          feedbackRow[i] = "green";
          usedIndices.add(i);
        }
      }

      // Second pass - check yellow (correct letter, wrong position)
      for (let i = 0; i < guess.length; i++) {
        if (feedbackRow[i] === "green") continue;

        for (let j = 0; j < target.length; j++) {
          if (!usedIndices.has(j) && guess[i] === target[j]) {
            feedbackRow[i] = "yellow";
            usedIndices.add(j);
            break;
          }
        }
      }

      state.feedback.push(feedbackRow);
    },
    resetFeedback: (state) => {
      state.feedback = [];
    },
  },
});

export const { setTargetWord, evaluateGuess, resetFeedback } =
  feedbackSlice.actions;
export default feedbackSlice.reducer;
