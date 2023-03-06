import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLists } from "../../features/watchlists/Slice/lists";
import { getMoviesLiked } from "../../features/movie liked/Slice/LikeMovie";
import { getTvshowsLiked } from "../../features/tvshow liked/slice/LikeTvshow";
import useMediaId from "../../utils/hooks/useMediaId";
import LoaderUI from "../Loader/LoaderUI";

const Lists = () => {
  const disaptch = useDispatch();
  const [globalLoading, setGlobalLoading] = useState(true);

  const {
    user: {
      user: { id: user_id },
    },
    lists: { lists: watchlists, loading },
    movieLiked: { likes: movieIdsLiked },
    tvshowLiked: { likes: tvshowIdsLiked },
  } = useSelector((state) => state);

  const { fetchContent: moviesLiked, loading: loadingMovieLiked } = useMediaId(
    movieIdsLiked,
    "movie"
  );
  const { fetchContent: tvshowLiked, loading: loadingTvshowLiked } = useMediaId(
    tvshowIdsLiked,
    "tv"
  );

  console.log(tvshowLiked);

  useEffect(() => {
    let arrLoading = [loadingMovieLiked, loadingTvshowLiked];
    console.log(loadingMovieLiked, loadingTvshowLiked);
    const state = arrLoading.every((el) => el === "idle");
    console.log(!state);
    setGlobalLoading(!state);
  }, [loadingMovieLiked, loadingTvshowLiked]);

  useEffect(() => {
    disaptch(getLists(user_id));
    disaptch(getMoviesLiked(user_id));
    disaptch(getTvshowsLiked(user_id));
  }, []);

  let numberLikedMovies = moviesLiked?.length;
  let numberLikedTvshow = tvshowLiked?.length;
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
