import React, { useContext } from "react";
import AppContext from "../../utils/Context/AppContextProvider";
import { ThemeProvider } from "@mui/material";
import LikesContainer from "./Likes/LikesContainer";
import WatchlistContainer from "./Watchlist/WatchlistContainer";

const FavoritesResume = () => {
  const { iconTheme } = useContext(AppContext);

  return (
    <ThemeProvider theme={iconTheme}>
      <div className="favorite-resume">
        <div className="favorite-resume__container">
          <LikesContainer />
          <WatchlistContainer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default FavoritesResume;
