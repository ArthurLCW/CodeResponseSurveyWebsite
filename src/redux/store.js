import { configureStore } from "@reduxjs/toolkit";
import recorderSlice from "./recorderSlice";

export default configureStore({
  reducer: {
    recorder: recorderSlice,
  },
});
