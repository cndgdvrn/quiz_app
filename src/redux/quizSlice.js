import { createSlice } from "@reduxjs/toolkit";
import { questions } from "../data/questions";

const initialState = {
  wholeQuestions: questions,
  totalQuestions: questions.length,
  currentQuestion: 0,
  score: 0,
  totalCorrect: 0,
  timer: 30000,
  timerStatus: false,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    incrementQuestion: (state) => {
      state.currentQuestion += 1;
    },
    checkAnswer: (state, action) => {
      if (
        state.wholeQuestions[state.currentQuestion].correctAnswer ===
        action.payload
      ) {
        state.totalCorrect += 1;
      }
    },
    calcScore: (state) => {
      state.score = state.totalCorrect * 10;
      console.log(state.score,"score");
    },
    updateTimer: (state) => {
      state.timer = state.timer - 100;
    },
    resetTimer: (state) => {
      state.timer = 30000;
    },
    updateTimerStatus: (state) => {
      state.timerStatus = !state.timerStatus;
    },
    resetQuizStates : (state) => {
      state.currentQuestion = 0;
      state.score = 0;
      state.totalCorrect = 0;
      state.timer = 30000;
      state.timerStatus = false;
    }
    
  },
});

export const {
  incrementQuestion,
  checkAnswer,
  calcScore,
  updateTimer,
  resetTimer,
  updateTimerStatus,
  resetQuizStates
} = quizSlice.actions;
export default quizSlice.reducer;
