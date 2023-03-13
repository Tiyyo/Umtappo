import React, { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { getIdsMoviesLiked } from "../../features/movie liked/Slice/likes.slice";
import { getIdsTvshowsLiked } from "../../features/tvshow liked/slice/like.slice";
import { useDispatch } from "react-redux";
import { getLists } from "../../features/watchlists/Slice/lists.slice";
import UserContext from "../../utils/Context/UserContextProvider";

const Favorites = () => {
  const { userID } = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLists(userID));
    dispatch(getIdsMoviesLiked(userID));
    dispatch(getIdsTvshowsLiked(userID));
  }, [userID]);

  return (
    <div className="favorites">
      <Outlet />
    </div>
  );
};

export default Favorites;
