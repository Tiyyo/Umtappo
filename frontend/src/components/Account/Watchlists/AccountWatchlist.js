import React, { useContext, useEffect, useState } from "react";
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
import LoaderUI from "../../Loader/LoaderUI";
import AppContext from "../../../utils/Context/AppContextProvider";
import UserContext from "../../../utils/Context/UserContextProvider";

const Lists = () => {
  const { languages } = useContext(AppContext);
  const { userID: user_id } = useContext(UserContext);

  const dispatch = useDispatch();

  const [globalLoading, setGlobalLoading] = useState(false);

  const store = useSelector((state) => {
    return state;
  });

  const {
    movieLiked: { ids: moviesLikedIds },
    tvshowLiked: { ids: tvshowsLikedIds },
    lists: { lists: watchlists, loading: loadingWatchlists },
  } = store;
  console.log();
  // const {
  //   user: {
  //     user: { id: user_id },
  //   },
  //   lists: { lists: watchlists, loading },
  //   movieLiked: { likes: movieIdsLiked },
  //   tvshowLiked: { likes: tvshowIdsLiked },
  // } = useSelector((state) => state);

  // useEffect(() => {
  //   let arrLoading = [loadingMovieLiked, loadingTvshowLiked];
  //   const state = arrLoading.every((el) => el === "idle");
  //   setGlobalLoading(!state);
  // }, [loadingMovieLiked, loadingTvshowLiked]);

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
        {globalLoading ? (
          <LoaderUI />
        ) : (
          <>
            <div className="movies-liked">
              <span>{numberLikedMovies}</span> Movie Liked
            </div>
            <div className="tvshows-liked">
              <span>{numberLikedTvshow}</span> Tv Show Liked
            </div>
            <div className="lists-created">
              You have <span>{numberOfLists}</span> Watchlists
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Lists;
