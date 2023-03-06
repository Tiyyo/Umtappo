import React, { useContext, useEffect, useState, useMemo } from "react";
import LoaderUI from "../Loader/LoaderUI";
import axios from "axios";
import AppContext from "../../utils/Context/AppContextProvider";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SmallCard from "./SmallCard";
import useMediaId from "../../utils/hooks/useMediaId";

const FavoriteResume = () => {
  const { config, languages } = useContext(AppContext);
  const dispatch = useDispatch();

  let mediaTypeTvv = "tv";
  let mediaTypeMovie = "movie";

  const { lists: myLists, loading: loadingListState } = useSelector(
    (state) => state.lists
  );
  const { likes: movies_liked_ids, loading: loadingMoviesState } = useSelector(
    (state) => state.movieLiked
  );
  const { likes: tvshow_liked_ids, loading: loadingTvshowState } = useSelector(
    (state) => state.tvshowLiked
  );

  const { fetchContent: moviesLiked, loading: loadingFetchMoviesLiked } =
    useMediaId(movies_liked_ids, mediaTypeMovie);

  const { fetchContent: tvshowsLiked, loading: loadingFetchTvLiked } =
    useMediaId(tvshow_liked_ids, mediaTypeTvv);

  console.log(
    moviesLiked,
    tvshowsLiked,
    loadingFetchMoviesLiked,
    loadingFetchTvLiked
  );

  const addType = (arr, type) => {
    return arr.map((c) => (c.media_type = type));
  };

  const pathLogoImage = (content) => {
    return config.base_url + config.logo_sizes[0] + content?.poster_path;
  };

  return (
    <div className="likes-watchlists">
      {/* {loadingListState === "pending" ? (
        <LoaderUI />
      ) : (
        <div className="likes-watchlists__container">
          <div className="likes-watchlists__container__likes">
            <h2>My Favorites</h2>
            <SmallCard
              list={{ content: moviesLiked, name: "Movie you Liked" }}
            />
            <SmallCard
              list={{ content: tvshowsLiked, name: "TvShow you Liked" }}
            />
          </div>
          <div className="likes-watchlists__container__watchlists">
            <h2>My Watchlists</h2>
            {myLists &&
              myLists.map((list) => {
                return (
                  <div key={list._id}>
                    <Link to={list.name} state={{ list }}>
                      <SmallCard list={list} />
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default FavoriteResume;
