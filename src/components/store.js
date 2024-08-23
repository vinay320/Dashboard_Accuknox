import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import modalReducer from "./modalSlice";
import widgetReducer from "./widgetSlice";
import combinedReducer from "./combineSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    modal: modalReducer,
    widget: widgetReducer,
    combine: combinedReducer,
  },
});

export default store;
