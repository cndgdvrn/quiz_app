import { configureStore } from '@reduxjs/toolkit'
import quizSlice from './quizSlice'
import modalSlice from './modalSlice'

export const store = configureStore({
  reducer: {
    quiz : quizSlice,
    modal : modalSlice
  },
})