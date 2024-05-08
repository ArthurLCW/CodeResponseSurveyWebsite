import { createSlice } from "@reduxjs/toolkit";

export const recorderSlice = createSlice({
  name: "recorder",
  initialState: {
    num: 0,
    screenFlag: false,
    failedAttentionCheck: false,
  },
  reducers: {
    increment: (state) => {
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
    toggleFailedAttentionCheckTrue: (state) => {
      state.failedAttentionCheck = true;
    },
    toggleFailedAttentionCheckFalse: (state) => {
      state.failedAttentionCheck = false;
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
  toggleFailedAttentionCheckTrue,
  toggleFailedAttentionCheckFalse,
} = recorderSlice.actions;

export default recorderSlice.reducer;
