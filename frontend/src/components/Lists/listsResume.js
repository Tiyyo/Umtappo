import React, { useContext, useEffect, useState, useMemo } from "react";
import LoaderUI from "../Loader/LoaderUI";
import axios from "axios";
import AppContext from "../../utils/Context/AppContextProvider";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SmallCard from "./SmallCard";
import useMediaId from "../../utils/hooks/useMediaId";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CameraRollIcon from "@mui/icons-material/CameraRoll";
import { ThemeProvider } from "@mui/material";

const FavoriteResume = () => {
  let listView = "list";
  let gridView = "grid";
  let mediaTypeTvv = "tv";
  let mediaTypeMovie = "movie";

  const { config, languages, iconTheme } = useContext(AppContext);

  const [globalLoading, setGlobalLoading] = useState(true);
  const [view, setView] = useState(gridView);
  const dispatch = useDispatch();

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

  const handleLoadingState = () => {
    let arr = [loadingFetchMoviesLiked, loadingFetchTvLiked];
    return arr.every((l) => l === "idle");
  };

  const addType = (arr, type) => {
    return arr.map((c) => (c.media_type = type));
  };

  const pathLogoImage = (content) => {
    return config.base_url + config.logo_sizes[0] + content?.poster_path;
  };

  const toggleView = () => {
    view === gridView ? setView(listView) : setView(gridView);
  };

  useEffect(() => {
    const bool = handleLoadingState();
    setGlobalLoading(!bool);
  }, [loadingFetchMoviesLiked, loadingFetchTvLiked]);

  return (
    <ThemeProvider theme={iconTheme}>
      <div className="likes-watchlists">
        {globalLoading ? (
          <LoaderUI />
        ) : (
          <div className="likes-watchlists__container">
            <div className="likes-watchlists__container__likes">
              <div className="likes-watchlists__container__likes--title">
                <BookmarkAddedIcon />
                <h2>My Favorites</h2>
              </div>
              <div className="likes-watchlists__container__likes--content">
                <Link
                  to={"movies_liked"}
                  state={{
                    list: {
                      content: moviesLiked,
                      name: "Movies you Liked",
                      _id: "1",
                    },
                    typeList: "like",
                  }}
                >
                  <SmallCard
                    list={{ content: moviesLiked, name: "Movie you Liked" }}
                  />
                </Link>

                <Link
                  to={"tvshows_liked"}
                  state={{
                    list: {
                      content: tvshowsLiked,
                      name: "TvShow you Liked",
                      _id: "2",
                    },
                    typeList: "like",
                  }}
                >
                  <SmallCard
                    list={{ content: tvshowsLiked, name: "TvShow you Liked" }}
                  />
                </Link>
              </div>
            </div>
            <div className="likes-watchlists__container__watchlists">
              <div className="likes-watchlists__container__watchlists--header">
                <div className="watchlists-title">
                  <CameraRollIcon />
                  <h2>My Watchlists</h2>
                </div>

                <button
                  className="manage-display"
                  type="button"
                  onClick={toggleView}
                >
                  {view === gridView ? <GridViewIcon /> : <ViewListIcon />}
                </button>
              </div>

              <div
                className="likes-watchlists__container__watchlists--main"
                data-view={view === gridView ? gridView : listView}
              >
                {myLists &&
                  myLists.map((list) => {
                    return (
                      <div key={list._id}>
                        <Link
                          to={list.name}
                          state={{ list, typeList: "watchlist" }}
                        >
                          <SmallCard list={list} />
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default FavoriteResume;
