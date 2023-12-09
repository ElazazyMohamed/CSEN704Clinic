import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js"; // Replace with your actual slice reducers

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
