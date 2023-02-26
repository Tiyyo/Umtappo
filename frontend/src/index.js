import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./utils/Context/AppContextProvider";
import { UserContextProvider } from "./utils/Context/UserContextProvider";
import { configureStore } from '@reduxjs/toolkit'
import {provider} from "react-redux"

const store = configureStore({
  reducer : {
    user : userListReducers,
  }
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider>
  <AppContextProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </AppContextProvider>
  </Provider>
  // </React.StrictMode>
);
