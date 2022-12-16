import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import notesSlice from "./notesSlice";

const rootReducer = combineReducers({
  notes: notesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
