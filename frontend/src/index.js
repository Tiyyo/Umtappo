import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./utils/Context/AppContextProvider";
import { UserContextProvider } from "./utils/Context/UserContextProvider";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import listsReducer from "./features/watchlists/Slice/lists.slice";
import userReducer from "./features/user/slice/user.slice";
import ratingReducer from "./features/rating/slice/rating.slice";
import headerResumeReducer from "./features/watchlists/Slice/resume.header";
import movieLikedReducer from "./features/movie liked/Slice/likes.slice";
import tvshowLikedReducer from "./features/tvshow liked/slice/like.slice";
import { tmdbAPI } from "./features/content/tmdbAPI";
import { setupListeners } from "@reduxjs/toolkit/query";
import { getDefaultNormalizer } from "@testing-library/react";
import mediaModalReducer from "./features/content/Slice/modalMedia.slice";

// middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(tmdbAPI.middleware),

const store = configureStore({
  reducer: {
    user: userReducer,
    lists: listsReducer,
    rating: ratingReducer,
    header_resume: headerResumeReducer,
    movieLiked: movieLikedReducer,
    tvshowLiked: tvshowLikedReducer,
    [tmdbAPI.reducerPath]: tmdbAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbAPI.middleware),
});

setupListeners(store.dispatch);

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
