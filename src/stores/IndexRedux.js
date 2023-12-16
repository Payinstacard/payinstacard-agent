import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { agentSlice } from "./AgentRedux";
import { customersSlice } from "./CustomerRedux";

// Combine the reducers
const rootReducer = combineReducers({
  agentData: agentSlice.reducer,
  customersData: customersSlice.reducer,
  // Add other reducers here
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk], // Apply Redux Thunk middleware
});

export const agentActions = agentSlice.actions;

export default store;
