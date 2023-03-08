import React, { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { getIdsMoviesLiked } from "../../features/movie liked/Slice/LikeMovie";
import { getIdsTvshowsLiked } from "../../features/tvshow liked/slice/LikeTvshow";
import { useDispatch, useSelector } from "react-redux";
import { getLists } from "../../features/watchlists/Slice/lists";
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
    <div className="wrapper">
      <Outlet />
    </div>
  );
};

export default Favorites;
