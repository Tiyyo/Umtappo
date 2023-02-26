import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./utils/Context/AppContextProvider";
import { UserContextProvider } from "./utils/Context/UserContextProvider";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userListsReducer from "./features/UsersLists";

const store = configureStore({
  reducer: {
    userLists: userListsReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AppContextProvider>
    <UserContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserContextProvider>
  </AppContextProvider>
  // </React.StrictMode>
);
