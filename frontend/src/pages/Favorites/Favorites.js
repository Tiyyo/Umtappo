import React, { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import {
  getFetchMovie,
  getIdsMoviesLiked,
} from "../../features/movie liked/Slice/likes.slice";
import {
  getFetchTvshow,
  getIdsTvshowsLiked,
} from "../../features/tvshow liked/slice/like.slice";
import { useDispatch } from "react-redux";
import { getLists } from "../../features/watchlists/Slice/lists.slice";
import UserContext from "../../utils/Context/UserContextProvider";
import AppContext from "../../utils/Context/AppContextProvider";

const Favorites = () => {
  const { userID } = useContext(UserContext);
  const { languages } = useContext(AppContext);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getLists(userID));
    // dispatch(getIdsMoviesLiked(userID)).then(() =>
    //   dispatch(getFetchMovie(languages))
    // );
    // dispatch(getIdsTvshowsLiked(userID)).then(() =>
    //   dispatch(getFetchTvshow(languages))
    // );
  }, [userID, languages]);

  return <div className="favorites">{/* <Outlet /> */}</div>;
};

export default Favorites;
