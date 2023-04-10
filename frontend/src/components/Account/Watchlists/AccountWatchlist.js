import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLists } from "../../../features/watchlists/Slice/lists.slice";
import {
  getFetchMovie,
  getIdsMoviesLiked,
} from "../../../features/movie liked/Slice/likes.slice";
import {
  getFetchTvshow,
  getIdsTvshowsLiked,
} from "../../../features/tvshow liked/slice/like.slice";
import AppContext from "../../../utils/Context/AppContextProvider";
import UserContext from "../../../utils/Context/UserContextProvider";

const Lists = () => {
  const { languages } = useContext(AppContext);
  const { userID: user_id } = useContext(UserContext);

  const dispatch = useDispatch();

  const store = useSelector((state) => {
    return state;
  });

  const {
    movieLiked: { ids: moviesLikedIds },
    tvshowLiked: { ids: tvshowsLikedIds },
    lists: { lists: watchlists },
  } = store;

  useEffect(() => {
    dispatch(getLists(user_id));
    dispatch(getIdsMoviesLiked(user_id));
    dispatch(getIdsTvshowsLiked(user_id));
    dispatch(getFetchMovie(languages));
    dispatch(getFetchTvshow(languages));
  }, [languages, user_id]);

  let numberLikedMovies = moviesLikedIds?.length;
  let numberLikedTvshow = tvshowsLikedIds?.length;
  let numberOfLists = watchlists.length;

  return (
    <div className="lists">
      <div className="lists__infos">
        <div className="movies-liked">
          <span>{numberLikedMovies}</span> Movie Liked
        </div>
        <div className="tvshows-liked">
          <span>{numberLikedTvshow}</span> Tv Show Liked
        </div>
        <div className="lists-created">
          You have <span>{numberOfLists}</span> Watchlists
        </div>
      </div>
    </div>
  );
};

export default Lists;
