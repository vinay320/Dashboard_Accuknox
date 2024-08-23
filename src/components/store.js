import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import combinedReducer from "./combineSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    combine: combinedReducer,
  },
});

export default store;
