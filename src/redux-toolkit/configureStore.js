import { configureStore, combineReducers } from "@reduxjs/toolkit";
import audioSlice from "./audio/audioSlice";
import globalSlice from "./global/globalSlice";
import logger from "redux-logger";
const reducer = combineReducers({
  global: globalSlice,
  audio: audioSlice,
});
const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
