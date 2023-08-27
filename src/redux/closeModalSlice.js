import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  closeModalStatus: false,
};

export const closeModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    OCCloseModal: (state) => {
      state.closeModalStatus = !state.closeModalStatus;
    },
    resetCloseModalStates : (state) => {
      state.closeModalStatus = false;
    }
  },
});

export const { OCCloseModal,resetCloseModalStates } = closeModalSlice.actions;
export default closeModalSlice.reducer;
