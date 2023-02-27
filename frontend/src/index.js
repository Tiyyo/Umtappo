import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./utils/Context/AppContextProvider";
import UserContext, {
  UserContextProvider,
} from "./utils/Context/UserContextProvider";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import listsReducer from "./features/lists";
import userReducer from "./features/user";

const store = configureStore({
  reducer: {
    user: userReducer,
    lists: listsReducer,
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
