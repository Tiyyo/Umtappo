import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./utils/Context/AppContextProvider";
import { UserContextProvider } from "./utils/Context/UserContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AppContextProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </AppContextProvider>
  // </React.StrictMode>
);
