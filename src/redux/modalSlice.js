import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    OCModal: (state) => {
      state.status = !state.status;
    },
    resetModalStates : (state) => {
      state.status = false;
    }
  },
});

export const { OCModal,resetModalStates } = modalSlice.actions;
export default modalSlice.reducer;
