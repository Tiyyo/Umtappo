import React, { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { getMoviesLiked } from "../../features/movie liked/Slice/LikeMovie";
import { getTvshowsLiked } from "../../features/tvshow liked/slice/LikeTvshow";
import { useDispatch, useSelector } from "react-redux";
import { getLists } from "../../features/watchlists/Slice/lists";
import UserContext from "../../utils/Context/UserContextProvider";
import useMediaId from "../../utils/hooks/useMediaId";

const Favorites = () => {
  const { userID } = useContext(UserContext);
  const dispatch = useDispatch();

  const { fetchMovies, fetchTvshows, loading } = useMediaId();
  console.log(fetchMovies, fetchTvshows, loading);

  useEffect(() => {
    dispatch(getLists(userID));
    dispatch(getMoviesLiked(userID));
    dispatch(getTvshowsLiked(userID));
  }, [userID]);

  return (
    <div className="wrapper">
      <Outlet />
    </div>
  );
};

export default Favorites;
