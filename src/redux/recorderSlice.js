import { createSlice } from "@reduxjs/toolkit";

export const recorderSlice = createSlice({
  name: "recorder",
  initialState: {
    num: 0,
    screenFlag: false,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.num += 1;
    },
    reset: (state) => {
      state.num = 0;
    },
    decrement: (state) => {
      if (state.num > 0) state.num -= 1;
    },
    incrementByAmount: (state, action) => {
      state.num += action.payload;
    },
    toggleScreenTrue: (state) => {
      state.screenFlag = true;
    },
    toggleScreenFalse: (state) => {
      state.screenFlag = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  reset,
  decrement,
  incrementByAmount,
  toggleScreenTrue,
  toggleScreenFalse,
} = recorderSlice.actions;

export default recorderSlice.reducer;
