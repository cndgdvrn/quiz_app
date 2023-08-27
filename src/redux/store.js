import { configureStore } from '@reduxjs/toolkit'
import quizSlice from './quizSlice'
import modalSlice from './modalSlice'
import closeModalSlice from './closeModalSlice'

export const store = configureStore({
  reducer: {
    quiz : quizSlice,
    modal : modalSlice,
    closeModal:closeModalSlice
  },
})