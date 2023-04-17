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
import movieLikedReducer from "./features/movie liked/Slice/likes.slice";
import tvshowLikedReducer from "./features/tvshow liked/slice/like.slice";
import { tmdbAPI } from "./features/content/tmdbAPI";
import { setupListeners } from "@reduxjs/toolkit/query";
import displayContentModalReducer from "./features/modal display content/modal.display.content";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import promotedMediaReducer from "./features/promoted/slice/promoted.media.slice";
import { PromotedMediaContextProvider } from "./utils/Context/PromotedMediaProvider";

if (process.env.NODE_ENV === "production") disableReactDevTools();
const store = configureStore({
  reducer: {
    user: userReducer,
    lists: listsReducer,
    rating: ratingReducer,
    movieLiked: movieLikedReducer,
    tvshowLiked: tvshowLikedReducer,
    displayContentModal: displayContentModalReducer,
    promotedMedia: promotedMediaReducer,
    [tmdbAPI.reducerPath]: tmdbAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbAPI.middleware),
  // devTools: false,
});

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AppContextProvider>
    <UserContextProvider>
      <Provider store={store}>
        <PromotedMediaContextProvider>
          <App />
        </PromotedMediaContextProvider>
      </Provider>
    </UserContextProvider>
  </AppContextProvider>
  // </React.StrictMode>
);
