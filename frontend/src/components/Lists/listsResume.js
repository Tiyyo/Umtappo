import React, { useContext, useEffect, useState } from "react";
import LoaderUI from "../Loader/LoaderUI";
import axios from "axios";
import AppContext from "../../utils/Context/AppContextProvider";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SmallCard from "./SmallCard";

const FavoriteResume = () => {
  const { config, languages } = useContext(AppContext);
  const dispatch = useDispatch();

  const { lists: myLists, loading: loadingListState } = useSelector(
    (state) => state.lists
  );
  const { likes: movies_liked, loading: loadingMoviesState } = useSelector(
    (state) => state.movieLiked
  );
  const { likes: tvshow_liked, loading: loadingTvshowState } = useSelector(
    (state) => state.tvshowLiked
  );

  const pathLogoImage = (content) => {
    return config.base_url + config.logo_sizes[0] + content?.poster_path;
  };

  return (
    <div className="likes-watchlists">
      {loadingListState === "pending" ? (
        <LoaderUI />
      ) : (
        <div className="likes-watchlists__container">
          <div className="likes-watchlists__container__likes">
            <h2>My Favorites</h2>
            {/* <SmallCard />
            <SmallCard /> */}
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
                    <h5>{list.name}</h5>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteResume;
