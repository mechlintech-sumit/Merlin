import { combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

// Redusers
import contactReduser from "./Redusers/contactReduser";


const rootReducer = combineReducers({
  contact: contactReduser,
 
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ReduxThunk),
});

export default store;
