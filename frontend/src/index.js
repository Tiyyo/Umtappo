import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./utils/Context/AppContextProvider";
import { UserContextProvider } from "./utils/Context/UserContextProvider";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import listsReducer from "./features/watchlists/Slice/lists";
import userReducer from "./features/user/slice/user";
import headerResumeReducer from "./features/watchlists/Slice/resume.header";
import movieLikedReducer from "./features/movie liked/Slice/LikeMovie";
import tvshowLikedReducer from "./features/tvshow liked/slice/LikeTvshow";

const store = configureStore({
  reducer: {
    user: userReducer,
    lists: listsReducer,
    header_resume: headerResumeReducer,
    movieLiked: movieLikedReducer,
    tvshowLiked: tvshowLikedReducer,
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
