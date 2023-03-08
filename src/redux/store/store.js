import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";

const rootReducer = combineReducers({
  // Add reducers here
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
