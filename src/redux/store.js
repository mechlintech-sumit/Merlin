import { combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

// Redusers
import authReduser from "./Redusers/authReduser";


const rootReducer = combineReducers({
  auth: authReduser,
 
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ReduxThunk),
});

export default store;
